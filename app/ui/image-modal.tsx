'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AddTagInput } from '@/app/edit/[id]/add-tag-input';
import { DeleteForm } from '@/app/edit/[id]/delete-form';

import { Tag as TagType, Image as ImageType } from '@prisma/client';

export default function ImageModal({
  image,
  close,
}: {
  image: ImageType | null;
  tags: TagType[];
  close: React.MouseEventHandler;
}) {
  const [tags, setTags] = useState<TagType[]>([]);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    if (!image?.id) {
      return;
    }

    try {
      fetch('/api/get-tags-by-image', {
        method: 'POST',
        body: JSON.stringify({ id: image.id }),
        headers: {
          'content-type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('response from get tags', data.tags);
          setTags(data.tags);
          setIsPending(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, [image?.id]);

  if (!image) {
    return;
  }

  return (
    <div
      onClick={close}
      className="fixed inset-0 z-10 flex items-center justify-center"
    >
      <div
        className="bg-slate-800 p-10 text-center shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>{image.title}</h1>
        <div className="relative" style={{ width: '300px', height: '500px' }}>
          <Image
            className="flex-column mx-auto flex"
            src={image.url}
            alt={`${image.url} image`}
            sizes="500px"
            fill
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
        <div className="mx-auto mt-4 flex w-full max-w-md flex-col gap-4">
          <div className="h-9">
            {!isPending && (
              <AddTagInput
                allTags={tags}
                initialImageTags={tags}
                id={image.id}
              />
            )}
          </div>
          <div className="flex justify-between">
            <button
              className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              onClick={(e) => navigator.clipboard.writeText(image.url)}
            >
              Copy
            </button>
            <DeleteForm style="ml-auto" id={image.id} title={image.title} />
          </div>
        </div>
      </div>
    </div>
  );
}
