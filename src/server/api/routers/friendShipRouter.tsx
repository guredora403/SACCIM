import { authorizedProcedure, createTRPCRouter } from "~/server/api/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { friendRequestRouter } from "./friendShip/requestRouter";

export const friendShipRouter = createTRPCRouter({
  request: friendRequestRouter,
});
