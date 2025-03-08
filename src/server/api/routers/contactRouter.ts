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
});
