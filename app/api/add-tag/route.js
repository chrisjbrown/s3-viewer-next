import { NextResponse } from 'next/server';

export async function POST(req, res) {
  const data = await req.json();
  try {
    const tag = await prisma.tag.update({
      where: {
        value: data.tagValue,
      },
      data: {
        images: {
          connect: {
            id: data.imageId,
          },
        },
      },
    });
    return NextResponse.json({
      tag,
    });
  } catch (error) {
    console.error('Post error:', error);
    throw new Error('Failed to update tag');
  }
}
