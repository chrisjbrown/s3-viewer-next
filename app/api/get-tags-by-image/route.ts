import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  try {
    const image = await prisma.image.findUnique({
      where: {
        id: data.id,
      },
      include: {
        tags: true,
      },
    });

    console.log('tags found', image?.tags);
    if (!image) {
      throw new Error('no tags found for image');
    }

    return NextResponse.json({
      tags: image.tags,
    });
  } catch (error) {
    console.error('Post error:', error);
    throw new Error('Failed to get tags');
  }
}
