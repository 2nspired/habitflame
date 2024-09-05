import { NextResponse } from 'next/server';
import categories from 'prisma/data/categories.json';

import { env } from '~/env.js';
import { db } from '~/utilities/prisma';

// SEED CATEGORIES

export async function GET() {
  await seedCategories();
  return NextResponse.json({ status: 'success' });
}

async function seedCategories() {
  if (env.NODE_ENV !== 'development') {
    return;
  }
  for (const category of categories) {
    try {
      const result = await db.habitCategory.upsert({
        create: {
          name: category.name,
          slug: category.slug,
          description: category.description,
          sort: category.sort,
        },
        update: {
          name: category.name,
          slug: category.slug,
          description: category.description,
          sort: category.sort,
        },
        where: {
          slug: category.slug,
        },
      });
      console.log('Category seeded:', result);
    } catch (error) {
      console.error('Error seeding category', error);
    }
  }
}
