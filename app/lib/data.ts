import { unstable_noStore as noStore } from 'next/cache';
import prisma from '@/app/lib/prisma';

export async function fetchImageById(id: string) {
  noStore();

  try {
    const image = await prisma.image.findUnique({
      where: {
        id: Number(id),
      },
    });
    console.log('image found', image);
    return image;
  } catch (error) {
    console.error('Prisma Error:', error);
    throw new Error('Failed to find image');
  }
}

export async function deleteImageById(id: string) {
  noStore();

  try {
    const image = await prisma.image.delete({
      where: {
        id: Number(id),
      },
    });
    console.log('image deleted', image);
    return image;
  } catch (error) {
    console.error('Prisma Error:', error);
    throw new Error('Failed to find image');
  }
}
