import prisma from '@/app/lib/prisma';
import { z } from 'zod';
import type { NextApiRequest, NextApiResponse } from 'next';

const TagSchema = z.object({
  name: z.string(),
});

const ImageSchema = z.object({
  title: z.string(),
  url: z.string(),
});

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const validatedData = ImageSchema.parse(req.body);
    const newImage = await prisma.image.create({ data: validatedData });
    res.status(200).json(newImage);
  } catch (error) {
    res.status(400).json({ error });
  }
}
