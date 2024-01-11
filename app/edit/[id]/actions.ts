'use server';
import prisma from '@/app/lib/prisma';
import { Prisma as PrismaLib } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function deleteImageById(id: string) {
  try {
    await prisma.image.delete({
      where: {
        id: Number(id),
      },
    });

    console.log('Successfully deleted image');
  } catch (error) {
    console.error(error);
    if (error instanceof PrismaLib.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        revalidatePath('/');
        redirect('/');
        return { status: 'error', message: 'Record to delete does not exist.' };
      }
    }
    return { status: 'error', message: 'Failed to delete image.' };
  }
  revalidatePath('/');
  redirect('/');
}
