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
          set: [],
        },
      },
    });

    await prisma.tag.delete({
      where: {
        value: data.tagValue,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    // if (error instanceof PrismaLib.PrismaClientKnownRequestError) {
    //   if (error.code === 'P2025') {
    //     console.error('Record to delete does not exist.');
    //     revalidatePath('/');
    //     redirect('/');
    //   }
    // }
    return { status: 'error', message: 'Failed to delete tag.' };
  }
}
