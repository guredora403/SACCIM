import { authorizedProcedure, createTRPCRouter } from "~/server/api/trpc";
import { ContactItemSchema } from "~/models";
import { contactValuePreProcess } from "~/models/myContact";

export const myContactRouter = createTRPCRouter({
  getAll: authorizedProcedure.query(async ({ ctx: { db, user } }) => {
    const contacts = await db.contactItem.findMany({
      where: {
        ownerId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        type: true,
        displayText: true,
        value: true,
        createdAt: true,
      },
    });
    return contacts;
  }),
  create: authorizedProcedure
    .input(ContactItemSchema)
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
