import {
  authorizedProcedure,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { RelationshipStatus } from "~/models";

export const friendRequestRouter = createTRPCRouter({
  getAvatarByToken: authorizedProcedure
    .input(z.object({ token: z.string() }))
    .output(
      z.object({
        name: z.string(),
        iconFileName: z.string(),
        isOwned: z.boolean(),
        relationshipStatus: z.nativeEnum(RelationshipStatus),
      }),
    )
    .query(async ({ ctx: { db, user }, input }) => {
      const { token } = input;
      const info = await db.friendInviteInfomation.findFirst({
        where: {
          token,
        },
        include: {
          avatar: true,
        },
      });
      if (!info) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The specied token not found",
        });
      }
      // アバターの所有者が自分だった場合
      if (info.avatar.userId === user.id) {
        return {
          name: info.avatar.name,
          iconFileName: info.avatar.iconFileName,
          isOwned: true,
          relationshipStatus: RelationshipStatus.none,
        };
      }
      // すでに友達か確認
      const existingFriend = await db.friendShip.findFirst({
        where: {
          ownerId: user.id,
          friendId: info.avatar.userId,
        },
      });
      if (existingFriend) {
        return {
          name: info.avatar.name,
          iconFileName: info.avatar.iconFileName,
          isOwned: false,
          relationshipStatus: RelationshipStatus.friend,
        };
      }
      // 送信済みのリクエストがあるか確認
      const existingRequest = await db.friendRequest.findUnique({
        where: {
          senderUserId_recipientUserId: {
            senderUserId: user.id,
            recipientUserId: info.avatar.userId,
          },
        },
      });
      if (existingRequest) {
        return {
          name: info.avatar.name,
          iconFileName: info.avatar.iconFileName,
          isOwned: false,
          relationshipStatus: RelationshipStatus.request_sent,
        };
      }
      // 受信済みのリクエストがあるか確認
      const existingReceivedRequest = await db.friendRequest.findUnique({
        where: {
          senderUserId_recipientUserId: {
            senderUserId: info.avatar.userId,
            recipientUserId: user.id,
          },
        },
      });
      if (existingReceivedRequest) {
        return {
          name: info.avatar.name,
          iconFileName: info.avatar.iconFileName,
          isOwned: false,
          relationshipStatus: RelationshipStatus.request_received,
        };
      }
      return {
        name: info.avatar.name,
        iconFileName: info.avatar.iconFileName,
        isOwned: false,
        relationshipStatus: RelationshipStatus.none,
      };
    }),
  getAvatarByTokenInPublic: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ ctx: { db }, input }) => {
      const { token } = input;
      const info = await db.friendInviteInfomation.findFirst({
        where: {
          token,
        },
        select: {
          avatar: {
            select: {
              name: true,
              iconFileName: true,
            },
          },
        },
      });
      if (!info) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The specified token not found",
        });
      }
      return info.avatar;
    }),
  getSentRequests: authorizedProcedure.query(async ({ ctx: { db, user } }) => {
    const requests = await db.friendRequest.findMany({
      where: {
        senderUserId: user.id,
      },
      select: {
        id: true,
        recipientAvatar: {
          select: {
            name: true,
            iconFileName: true,
          },
        },
        senderAvatar: {
          select: {
            id: true,
            name: true,
            iconFileName: true,
          },
        },
        createdAt: true,
      },
    });
    return requests;
  }),
  getSentRequest: authorizedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx: { db, user }, input }) => {
      const { id } = input;
      const request = await db.friendRequest.findUnique({
        where: {
          id,
          senderUserId: user.id,
        },
        select: {
          id: true,
          recipientAvatar: {
            select: {
              name: true,
              iconFileName: true,
            },
          },
          senderAvatar: {
            select: {
              id: true,
              name: true,
              iconFileName: true,
            },
          },
          createdAt: true,
        },
      });
      if (!request) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The specified request not found",
        });
      }
      return request;
    }),
  getReceivedRequests: authorizedProcedure.query(
    async ({ ctx: { db, user } }) => {
      const requests = await db.friendRequest.findMany({
        where: {
          recipientUserId: user.id,
        },
        select: {
          id: true,
          recipientAvatar: {
            select: {
              id: true,
              name: true,
              iconFileName: true,
            },
          },
          senderAvatar: {
            select: {
              name: true,
              iconFileName: true,
            },
          },
          createdAt: true,
        },
      });
      return requests;
    },
  ),
  getReceivedRequest: authorizedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx: { db, user }, input }) => {
      const { id } = input;
      const request = await db.friendRequest.findUnique({
        where: {
          id,
          recipientUserId: user.id,
        },
        select: {
          id: true,
          recipientAvatar: {
            select: {
              id: true,
              name: true,
              iconFileName: true,
            },
          },
          senderAvatar: {
            select: {
              name: true,
              iconFileName: true,
            },
          },
          createdAt: true,
        },
      });
      if (!request) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The specified request not found",
        });
      }
      return request;
    }),
  acceptFriendRequest: authorizedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx: { db, user }, input }) => {
      const { id } = input;
      const request = await db.friendRequest.findUnique({
        where: {
          id,
          recipientUserId: user.id,
        },
        include: {
          senderAvatar: true,
          recipientAvatar: true,
        },
      });
      if (!request) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The specified request not found",
        });
      }
      const friendShip = await db.$transaction(async (tx) => {
        // 申請側→申請受けた側
        await tx.friendShip.create({
          data: {
            ownerId: request.senderUserId,
            friendId: request.recipientUserId,
            primaryFriendAvatarId: request.recipientAvatar.id,
            contactAvatars: {
              create: {
                avatarId: request.recipientAvatar.id,
                ownerId: request.senderUserId,
              },
            },
          },
        });
        // 申請受けた側→申請側
        const result = await tx.friendShip.create({
          data: {
            ownerId: request.recipientUserId,
            friendId: request.senderUserId,
            primaryFriendAvatarId: request.senderAvatar.id,
            contactAvatars: {
              create: {
                avatarId: request.senderAvatar.id,
                ownerId: request.recipientUserId,
              },
            },
          },
          select: {
            id: true,
            primaryFriendAvatar: {
              select: {
                name: true,
                iconFileName: true,
              },
            },
            createdAt: true,
          },
        });
        await tx.friendRequest.delete({
          where: {
            id,
          },
        });
        return result;
      });
      return friendShip;
    }),
  createFriendRequest: authorizedProcedure
    .input(z.object({ targetToken: z.string(), avatarId: z.number() }))
    .mutation(async ({ ctx: { db, user }, input }) => {
      const { targetToken, avatarId } = input;
      const target = await db.friendInviteInfomation.findFirst({
        where: {
          token: targetToken,
        },
        include: {
          avatar: true,
        },
      });
      if (!target) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The specied token not found",
        });
      }
      if (target.avatar.userId === user.id) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You cannot send a friend request to yourself",
        });
      }
      // get avatar info
      const avatar = await db.avatar.findUnique({
        where: {
          id: avatarId,
          userId: user.id,
        },
      });
      if (!avatar) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The specified avatar not found",
        });
      }
      // Check if the request already exists
      const existingRequest = await db.friendRequest.findUnique({
        where: {
          senderUserId_recipientUserId: {
            senderUserId: user.id,
            recipientUserId: target.avatar.userId,
          },
        },
      });
      if (existingRequest) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "The friend request already exists",
        });
      }
      const request = await db.friendRequest.create({
        data: {
          senderUserId: user.id,
          senderAvatarId: avatar.id,
          recipientUserId: target.avatar.userId,
          recipientAvatarId: target.avatar.id,
        },
        select: {
          id: true,
          senderAvatar: true,
          recipientAvatar: {
            select: {
              id: true,
              name: true,
              iconFileName: true,
            },
          },
        },
      });
      return request;
    }),
});
