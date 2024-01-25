import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  try {
    await prisma.tag.update({
      where: {
        value: data.tagValue,
      },
      data: {
        images: {
          disconnect: {
            id: data.imageId,
          },
        },
      },
    });
    return NextResponse.json({
      message: 'Success',
    });
  } catch (error) {
    console.error('Post error:', error);
    throw new Error('Failed to remove tag');
  }
}
