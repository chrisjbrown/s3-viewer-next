'use server';
import prisma from '@/app/lib/prisma';
import { Prisma as PrismaLib, Tag as TagType } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import sharp from 'sharp';

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_APP_AWS_REGION || '',
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_APP_AWS_ACCESS_KEY || '',
    secretAccessKey: process.env.NEXT_PUBLIC_APP_AWS_SECRET_ACCESS_KEY || '',
  },
});

async function uploadFileToS3(file: Buffer, fileName: string) {
  const fileBuffer = await sharp(file).toBuffer();

  const params = {
    Bucket:
      process.env.NEXT_PUBLIC_APP_AWS_S3_BUCKET_NAME || 'bluegreymousefoundry',
    Key: fileName,
    Body: fileBuffer,
  };

  const command = new PutObjectCommand(params);
  try {
    const response = await s3Client.send(command);
    console.log('File uploaded successfully:', response);
  } catch (error) {
    console.error('Error adding image to s3');
    throw error;
  }
}

async function deleteFileFromS3(fileName: string) {
  const params = {
    Bucket: process.env.NEXT_PUBLIC_APP_AWS_S3_BUCKET_NAME,
    Key: fileName,
  };

  const command = new DeleteObjectCommand(params);
  try {
    const response = await s3Client.send(command);
    console.log('File deleted successfully:', response);
  } catch (error) {
    console.error('Error deleting image from s3');
    throw error;
  }
}

async function uploadFile(file: File) {
  const buffer = Buffer.from(await file.arrayBuffer());
  await uploadFileToS3(buffer, file.name);
  await prisma.image.create({
    data: {
      title: file.name,
      url: `https://s3.${process.env.NEXT_PUBLIC_APP_AWS_REGION}.amazonaws.com/${process.env.NEXT_PUBLIC_APP_AWS_S3_BUCKET_NAME}/${file.name}`,
    },
  });
}

export async function uploadFiles(prevState: any, formData: FormData) {
  try {
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return { status: 'error', message: 'Please select at least one file.' };
    }

    const uploads = files.map((file) => {
      return uploadFile(file);
    });

    await Promise.all(uploads);
  } catch (error) {
    console.error(error);
    return { status: 'error', message: 'Failed to upload file.' };
  }

  revalidatePath('/upload');
  return { status: 'success', message: 'Files uploaded successfully' };
}

export async function deleteImageById(id: number, title: string) {
  try {
    await deleteFileFromS3(title);
    await prisma.image.delete({
      where: {
        id: id,
      },
    });

    console.log('Successfully deleted image');
  } catch (error) {
    console.error(error);
    if (error instanceof PrismaLib.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        console.error('Record to delete does not exist.');
        revalidatePath('/');
        redirect('/');
      }
    }
    return { status: 'error', message: 'Failed to delete image.' };
  }
  revalidatePath('/');
  redirect('/');
}

export async function addTag(formData: FormData) {
  const tagLabel = formData.get('tagLabel') as string;
  try {
    await prisma.tag.create({
      data: {
        label: tagLabel,
        value: tagLabel.toLowerCase().replace(/\W/g, ''),
      },
    });
  } catch (error) {
    console.error(error);
    return { status: 'error', message: 'Failed to create tag.' };
  }
  revalidatePath('/edit-tags');
}

export async function deleteTag(tagValue: string) {
  try {
    await prisma.tag.update({
      where: {
        value: tagValue,
      },
      data: {
        images: {
          set: [],
        },
      },
    });

    await prisma.tag.delete({
      where: {
        value: tagValue,
      },
    });
  } catch (error) {
    console.error(error);
    return { status: 'error', message: 'Failed to delete tag.' };
  }
  revalidatePath('/edit-tags');
}
