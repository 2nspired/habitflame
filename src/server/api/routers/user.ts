import { z } from 'zod';

import { db } from '~/utilities/prisma';

import { adminProcedure, createTRPCRouter } from '../trpc';

export const userRouter = createTRPCRouter({
  // GET USER INFORMATION
  getUser: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const user = await db.user.findUnique({
          where: {
            id: input.id,
          },
        });

        if (!user) {
          throw new Error('User not found');
        }
        return user;
      } catch (error) {
        console.error('Error fetching user', error);
      }
    }),

  // UPDATE USER INFORMATION
  updateUser: adminProcedure
    .input(
      z.object({
        id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        // FIXME: SET PASSWORD TO HAVE SPECIFIC REQUIREMENTS
        password: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const updateUser = await db.user.update({
          where: {
            id: input.id,
          },
          data: {
            ...input,
          },
        });

        return updateUser;
      } catch (error) {
        console.error('Error updating user', error);
      }
    }),
});
