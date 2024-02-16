import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  try {
    const images = await prisma.image.findMany({
      where: {
        title: {
          contains: data.query,
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
