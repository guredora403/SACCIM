import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { authorizedProcedure, createTRPCRouter } from "~/server/api/trpc";

export const contactRouter = createTRPCRouter({
  getAll: authorizedProcedure.query(async ({ ctx: { db, user } }) => {
    // ユーザーのContactAvatarを取得
    return await db.contactAvatar.findMany({
      where: {
        ownerId: user.id,
      },
      select: {
        id: true,
        avatar: {
          select: {
            id: true,
            name: true,
            iconFileName: true,
          },
        },
        friendShip: {
          select: {
            id: true,
            primaryFriendAvatar: {
              select: {
                name: true,
                iconFileName: true,
              },
            },
          },
        },
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  getById: authorizedProcedure
    .input(
      z.object({
        contactAvatarId: z.number(),
      }),
    )
    .query(async ({ ctx: { db, user }, input }) => {
      const { contactAvatarId } = input;
      const contactAvatar = await db.contactAvatar.findUnique({
        where: {
          id: contactAvatarId,
          ownerId: user.id,
        },
        select: {
          id: true,
          avatar: {
            select: {
              id: true,
              name: true,
              iconFileName: true,
            },
          },
          friendShip: {
            select: {
              id: true,
              primaryFriendAvatar: {
                select: {
                  name: true,
                  iconFileName: true,
                },
              },
            },
          },
          createdAt: true,
        },
      });
      if (!contactAvatar) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "ContactAvatar not found",
        });
      }
      return contactAvatar;
    }),
});
