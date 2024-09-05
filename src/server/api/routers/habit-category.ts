import { z } from 'zod';

import { db } from '~/utilities/prisma';

import { createTRPCRouter, publicProcedure } from '../trpc';

// FIXME: ADD ADMIN PROCEDURE TO UPDATE HABIT CATEGORY

export const habitCategoryRouter = createTRPCRouter({
  // GET HABIT HABIT CATEGORIES
  getHabitCategories: publicProcedure.query(async () => {
    try {
      const habitCategories = await db.habitCategory.findMany({
        orderBy: {
          sort: 'asc',
        },
      });
      return habitCategories;
    } catch (error) {
      console.error('Error fetching habit categories', error);
    }
  }),

  // GET HABIT CATEGORY
  getHabitCategory: publicProcedure
    .input(
      z.object({
        slug: z.string().optional(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const habitCategory = await db.habitCategory.findUnique({
          where: {
            slug: input.slug,
          },
        });

        if (!habitCategory) {
          throw new Error('User not found');
        }
        return habitCategory;
      } catch (error) {
        console.error('Error fetching habitCategory', error);
      }
    }),

  // UPDATE HABIT CATEGORY INFORMATION
  UpdateHabitCategory: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
        slug: z.string().optional(),
        description: z.string().optional(),
        sort: z.number().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const updatedHabitCategory = await db.user.update({
          where: {
            id: input.id,
          },
          data: {
            ...input,
          },
        });
        return updatedHabitCategory;
      } catch (error) {
        console.error('Error updating habit category', error);
      }
    }),
});
