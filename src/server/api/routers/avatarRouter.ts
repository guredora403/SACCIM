// アバター管理API
import { authorizedProcedure, createTRPCRouter } from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { getBaseUrl } from "~/utils/url";
import { ulid } from "ulid";

function getInvitationUrlFromToken(token: string) {
  return `${getBaseUrl()}/invitation/${token}`;
}

export const avatarRouter = createTRPCRouter({
  getAll: authorizedProcedure.query(async ({ ctx: { db, user } }) => {
    return await db.avatar.findMany({
      where: {
        userId: user.id,
      },
      select: {
        id: true,
        name: true,
        iconFileName: true,
      },
    });
  }),
  create: authorizedProcedure
    .input(
      z.object({
        name: z.string().min(2),
      }),
    )
    .mutation(async ({ ctx: { db, user }, input }) => {
      return await db.avatar.create({
        data: {
          name: input.name,
          userId: user.id,
        },
      });
    }),
  getInvitationUrl: authorizedProcedure
    .input(z.object({ avatarId: z.number() }))
    .query(async ({ ctx: { db, user }, input }) => {
      const { avatarId } = input;
      const avatar = await db.avatar.findUnique({
        where: {
          id: avatarId,
          userId: user.id,
        },
        include: {
          inviteInformation: true,
        },
      });
      if (!avatar) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The specified avatar ID not found.",
        });
      }
      return {
        avatarId: avatar.id,
        inviteInfo: avatar.inviteInformation
          ? {
              token: avatar.inviteInformation.token,
              url: getInvitationUrlFromToken(avatar.inviteInformation.token),
            }
          : null,
        avatarInfo: {
          id: avatar.id,
          name: avatar.name,
          iconFileName: avatar.iconFileName,
        },
      };
    }),
  generateInvitationUrl: authorizedProcedure
    .input(z.object({ avatarId: z.number() }))
    .mutation(async ({ ctx: { db, user }, input }) => {
      const avatar = await db.avatar.findUnique({
        where: {
          id: input.avatarId,
          userId: user.id,
        },
      });
      if (!avatar) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The specified avatar ID not found.",
        });
      }
      const newInformation = await db.$transaction(async (tx) => {
        await tx.friendInviteInfomation.deleteMany({
          // 初回生成時にはdeleteだとエラーになるのでDeleteManyを使う
          where: {
            avatarId: avatar.id,
          },
        });
        return await tx.friendInviteInfomation.create({
          data: {
            avatarId: avatar.id,
            token: ulid(),
          },
        });
      });
      return {
        avatarId: avatar.id,
        info: {
          token: newInformation.token,
          url: getInvitationUrlFromToken(newInformation.token),
        },
      };
    }),
});
