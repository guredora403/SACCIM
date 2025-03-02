import { authorizedProcedure, createTRPCRouter } from "~/server/api/trpc";
import {z} from 'zod';
import { TRPCError } from "@trpc/server";

export const friendRequestRouter = createTRPCRouter({
    getAvatarByToken: authorizedProcedure
    .input(z.object({token: z.string()}))
    .query(async ({ctx: {db, user}, input }) => {
        const { token } = input
        const info = await db.friendInviteInfomation.findFirst({
            where: {
                token
            },
            include: {
                avatar: true
            }
        })
        if (!info) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'The specied token not found'
            })
        }
        return info.avatar
    }),
});
