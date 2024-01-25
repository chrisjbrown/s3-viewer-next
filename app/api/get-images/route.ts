import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

async function getImagesByTags(tags: string[]) {
  console.log('tags', tags);
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
}

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  try {
    const images = await getImagesByTags(data.tags);
    console.log('images found', images);
    return NextResponse.json({
      images: images,
    });
  } catch (error) {
    console.error('Post error:', error);
    throw new Error('Failed to get images');
  }
}
