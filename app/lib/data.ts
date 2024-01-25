import { unstable_noStore as noStore } from 'next/cache';
import prisma from '@/app/lib/prisma';

export async function fetchImageById(id: number) {
  noStore();

  try {
    const image = await prisma.image.findUnique({
      where: {
        id: id,
      },
      include: {
        tags: true,
      },
    });
    console.log('image found', image);
    return image;
  } catch (error) {
    console.error('Prisma Error:', error);
    throw new Error('Failed to find image');
  }
}

export async function fetchTags() {
  try {
    return await prisma.tag.findMany();
  } catch (error) {
    console.error('Prisma Error:', error);
    throw new Error('Failed to find tags');
  }
}

export async function getImagesByTags(tags: string[]) {
  console.log('tags', tags);
  try {
    return tags.length === 0
      ? prisma.image.findMany()
      : prisma.image.findMany({
          where: {
            tags: {
              some: {
                value: {
                  in: tags,
                },
              },
            },
          },
        });
  } catch (error) {
    console.error('Prisma Error:', error);
    throw new Error('Failed to find images');
  }
}
