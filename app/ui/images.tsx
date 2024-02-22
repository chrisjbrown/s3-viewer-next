'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Image as ImageType, Tag as TagType } from '@prisma/client';
import ImageModal from '@/app/ui/image-modal';

export default function Images({
  searchParams,
  tags,
}: {
  searchParams: { [key: string]: string | undefined };
  tags: TagType[];
}) {
  const tagsParam = searchParams.tags;
  const [images, setImages] = useState<ImageType[]>([]);
  const [isPending, setIsPending] = useState(true);
  const [selectedImage, selectImage] = useState<ImageType | null>(null);

  useEffect(() => {
    setIsPending(true);
    try {
      fetch('/api/images-by-tags', {
        method: 'POST',
        body: JSON.stringify({ tags: tagsParam?.split(',') || [] }),
        headers: {
          'content-type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('response from get images', data.images);
          setImages(data.images);
          setIsPending(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, [tagsParam]);

  function closeModal() {
    selectImage(null);
  }

  function onSelectImage(image: ImageType) {
    selectImage(image);
  }

  function onSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;

    try {
      fetch('/api/image-search', {
        method: 'POST',
        body: JSON.stringify({ query: query.trim().toLowerCase() }),
        headers: {
          'content-type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log('response from search images', data.images);
          setImages(data.images);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function onDeleteImage(id: number) {
    setImages(images.filter((image) => image.id !== id));
    selectImage(null);
  }

  if (isPending) {
    return <div className="mx-auto">Loading images...</div>;
  }

  return (
    <>
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          tags={tags}
          close={closeModal}
          deleteImage={onDeleteImage}
        />
      )}
      <div className="mx-auto">
        <input
          className="text-slate-800"
          type="text"
          onInput={onSearch}
          placeholder="Search"
        />
      </div>

      <div className="mx-auto mb-12 mt-6 grid grid-cols-4 justify-center gap-6">
        {images.length === 0 ? (
          <div>No images found</div>
        ) : (
          images?.map((image) => {
            return (
              <button key={image.id} onClick={() => onSelectImage(image)}>
                <Image
                  src={image.url}
                  alt={image.title}
                  width={300}
                  height={300}
                />
              </button>
            );
          })
        )}
      </div>
    </>
  );
}
