import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { publicProcedure } from "~/server/api/trpc";
import { env } from "~/env";
import { avatarRouter } from "./routers/avatarRouter";
import { friendShipRouter } from "./routers/friendShipRouter";
import { myContactRouter } from "./routers/myContactRouter";
import { contactRouter } from "./routers/contactRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  avatar: avatarRouter,
  friendShip: friendShipRouter,
  myContact: myContactRouter,
  contact: contactRouter,
  isDev: publicProcedure.query(async () => {
    return env.NODE_ENV === "development";
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
