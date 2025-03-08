import { authorizedProcedure, createTRPCRouter } from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { friendRequestRouter } from "./friendShip/requestRouter";
import { Prisma } from "@prisma/client";

export const friendShipRouter = createTRPCRouter({
  request: friendRequestRouter,
  getAll: authorizedProcedure.query(async ({ ctx: { db, user } }) => {
    return await db.friendShip.findMany({
      where: {
        ownerId: user.id,
      },
      select: {
        id: true,
        primaryFriendAvatar: {
          select: {
            name: true,
            iconFileName: true,
          },
        },
      },
    });
  }),
  getDetail: authorizedProcedure
    .input(z.object({ friendShipId: z.number() }))
    .query(async ({ ctx: { db, user }, input }) => {
      const { friendShipId } = input;

      // 友達関係の存在確認 (自分が所有者であることも確認)
      const friendShip = await db.friendShip.findUnique({
        where: {
          id: friendShipId,
          ownerId: user.id,
        },
        include: {
          friend: true,
          primaryFriendAvatar: {
            select: {
              id: true,
              name: true,
              iconFileName: true,
            },
          },
          contactAvatars: {
            select: {
              avatarId: true,
            },
          },
        },
      });

      if (!friendShip) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "友達関係が見つかりません",
        });
      }

      // 登録されているアバターIDのセットを作成
      const registeredAvatarIds = new Set(
        friendShip.contactAvatars.map((ca) => ca.avatarId),
      );

      // 友達ユーザーのアバター一覧を取得し、登録状態を追加
      const friendAvatars = await db.avatar.findMany({
        where: {
          userId: friendShip.friendId,
        },
        select: {
          id: true,
          name: true,
          iconFileName: true,
        },
      });

      const avatarsWithRegistrationStatus = friendAvatars.map((avatar) => ({
        ...avatar,
        isRegistered: registeredAvatarIds.has(avatar.id), // register contactAvatars
      }));

      // 友達ユーザーの連絡先情報を取得
      const friendContactItems = await db.contactItem.findMany({
        where: {
          ownerId: friendShip.friendId,
        },
        select: {
          id: true,
          type: true,
          displayText: true,
          value: true,
        },
      });
      return {
        friendShip: {
          id: friendShip.id,
          primaryAvatar: friendShip.primaryFriendAvatar,
        },
        avatars: avatarsWithRegistrationStatus,
        contactItems: friendContactItems,
      };
    }),
  updateContactAvatar: authorizedProcedure
    .input(
      z.object({
        friendShipId: z.number(),
        avatarId: z.number(),
        isRegistered: z.boolean(),
      }),
    )
    .mutation(async ({ ctx: { db, user }, input }) => {
      const { friendShipId, avatarId, isRegistered } = input;

      // 友達関係の存在確認 (自分が所有者であることも確認)
      const friendShip = await db.friendShip.findUnique({
        where: {
          id: friendShipId,
          ownerId: user.id,
        },
        include: {
          contactAvatars: {
            select: { avatarId: true },
          },
        },
      });

      if (!friendShip) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "友達関係が見つかりません",
        });
      }

      // アバターの存在確認 (友達のアバターであることも確認)
      const avatar = await db.avatar.findUnique({
        where: {
          id: avatarId,
          userId: friendShip.friendId,
        },
      });

      if (!avatar) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "アバターが見つかりません",
        });
      }

      // 登録解除の場合
      if (!isRegistered) {
        try {
          // 削除処理 - findFirstして削除する代わりに直接削除を試みる
          // 最後のアバターでも削除可能にする（UI側で警告を表示）
          await db.contactAvatar.deleteMany({
            where: {
              friendShipId,
              avatarId,
              ownerId: user.id,
            },
          });

          return { success: true };
        } catch (error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "アバターの登録解除に失敗しました",
          });
        }
      }

      // 登録の場合 - unique制約によりエラーになる場合は無視
      try {
        await db.contactAvatar.create({
          data: {
            ownerId: user.id,
            friendShipId,
            avatarId,
          },
        });

        return { success: true };
      } catch (error) {
        // unique制約違反は無視してOKを返す
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2002"
        ) {
          return { success: true };
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "アバターの登録に失敗しました",
        });
      }
    }),
});
