// アバター管理API
import { authorizedProcedure, createTRPCRouter } from "~/server/api/trpc";
import {z} from 'zod';

export const avatarRouter = createTRPCRouter({
    getAll: authorizedProcedure.query(async ({ctx: { db, user } }) => {
        return await db.avatar.findMany({
            where: {
                userId: user.id,
            },
            select: {
                id: true,
                name: true,
                iconFileName: true
            }
        })
    }),
    create: authorizedProcedure
    .input(z.object({
        name: z.string().min(2),
    }))
    .mutation(async ({ctx: { db, user }, input }) => {
        return await db.avatar.create({
            data: {
                name: input.name,
                userId: user.id
            }
        })
    }),
});