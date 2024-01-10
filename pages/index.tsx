import ProgressBar from '@/app/ui/progressbar';
import Image from 'next/image';
import { useMotionValue } from 'framer-motion';
import React, { useState, useRef } from 'react';
import { uploadImage } from '@/app/lib/s3-bucket';
import prisma from '@/app/lib/prisma';
import { GetServerSideProps } from 'next';
import { Image as ImageType } from '@prisma/client';

export const getServerSideProps: GetServerSideProps = async () => {
  const images = await prisma.image.findMany();
  console.log('got images on load', images);
  return { props: { images } };
};

type Props = {
  images?: ImageType[];
};

export default function Page({ images }: Props) {
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [upload, setUpload] = useState<AWS.S3.ManagedUpload | null>(null);
  const progress = useMotionValue(0);

  const handleUpload: React.ChangeEventHandler<HTMLInputElement> = async (
    e,
  ) => {
    e.preventDefault();
    setFile(e.target.files![0]);
    if (!file) return;

    try {
      const upload = uploadImage(file);
      setUpload(upload);
      upload.on('httpUploadProgress', (p) => {
        progress.set(p.loaded / p.total);
      });
      const data = await upload.promise();
      console.log(`File uploaded successfully: ${file.name}`, data);
      const response = await fetch('/api/add-image', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          title: file.name,
          url: data.Location,
        }),
      });
      const newImage = await response.json();
      images?.push(newImage);
    } catch (err) {
      console.error(err);
    }
    setUpload(null);
    setFile(null);
    progress.set(0);
  };

  return (
    <main className="flex min-h-screen flex-col">
      <h1>S3 viewer</h1>
      <div className="mt-4 flex grow flex-col gap-4">
        <div>
          <h2 className="text-center">Images</h2>
        </div>
        {images?.map((image) => {
          return (
            <Image
              key={image.id}
              src={image.url}
              alt={image.title}
              width={200}
              height={200}
            />
          );
        })}
      </div>
      <div>
        <form className="flex flex-col bg-stone-800 p-2 text-white shadow">
          <input
            type="file"
            id="upload-btn"
            onChange={handleUpload}
            ref={hiddenFileInput}
            hidden
          />
          <label className="text-center" htmlFor="upload-btn">
            {upload ? 'Uploading file...' : 'Upload a file'}
          </label>
          <div className="h-2">
            {upload && <ProgressBar value={progress} />}
          </div>
        </form>
      </div>
    </main>
  );
}
