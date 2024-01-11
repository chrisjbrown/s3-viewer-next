'use server';
import prisma from '@/app/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect, RedirectType } from 'next/navigation';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
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
    Bucket: process.env.NEXT_PUBLIC_APP_AWS_S3_BUCKET_NAME,
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

export async function uploadFile(prevState: any, formData: FormData) {
  let dbEntry;
  try {
    const file = formData.get('file') as File;

    if (file.size === 0) {
      return { status: 'error', message: 'Please select a file.' };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    await uploadFileToS3(buffer, file.name);
    dbEntry = await prisma.image.create({
      data: {
        title: file.name,
        url: `https://s3.${process.env.NEXT_PUBLIC_APP_AWS_REGION}.amazonaws.com/${process.env.NEXT_PUBLIC_APP_AWS_S3_BUCKET_NAME}/${file.name}`,
      },
    });
    console.log('dbentry', dbEntry);
  } catch (error) {
    console.error(error);
    return { status: 'error', message: 'Failed to upload file.' };
  }

  revalidatePath('/');
  redirect(`/edit/${dbEntry.id}`);
}
