import { authorizedProcedure, createTRPCRouter } from "~/server/api/trpc";
import { MyContactSchema } from "~/models";
import { contactValuePreProcess } from "~/models/myContact";

export const myContactRouter = createTRPCRouter({
  create: authorizedProcedure
    .input(MyContactSchema)
    .mutation(async ({ ctx: { db, user }, input }) => {
      const preprocessedValue = contactValuePreProcess(input.type, input.value);
      const contact = await db.contactItem.create({
        data: {
          type: input.type,
          displayText: input.displayText,
          value: preprocessedValue,
          ownerId: user.id,
        },
        select: {
          id: true,
          type: true,
          displayText: true,
          value: true,
        },
      });
      return contact;
    }),
});
