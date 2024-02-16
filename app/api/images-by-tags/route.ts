import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  try {
    const images =
      data.tags.length === 0
        ? await prisma.image.findMany()
        : await prisma.image.findMany({
            where: {
              tags: {
                some: {
                  value: {
                    in: data.tags,
                  },
                },
              },
            },
          });
    console.log('images found', images);
    return NextResponse.json({
      images: images,
    });
  } catch (error) {
    console.error('Post error:', error);
    throw new Error('Failed to get images');
  }
}
