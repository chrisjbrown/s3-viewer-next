import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  try {
    const tag = await prisma.tag.create({
      data: {
        label: data.label,
        value: data.value,
        images: {
          connect: {
            id: data.id,
          },
        },
      },
    });
    return NextResponse.json({
      tag,
    });
  } catch (error) {
    console.error('Post error:', error);
    throw new Error('Failed to create tag');
  }
}
