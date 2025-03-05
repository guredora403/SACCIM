import { authorizedProcedure, createTRPCRouter } from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { friendRequestRouter } from "./friendShip/requestRouter";

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
});
