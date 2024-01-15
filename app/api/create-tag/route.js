import { NextResponse } from 'next/server';

export async function POST(req, res) {
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
