'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tag as TagType } from '@prisma/client';
import { useSearchParams } from 'next/navigation';

type Props = {
  tags?: TagType[];
};

export default function Tags({ tags }: Props) {
  const searchParams = useSearchParams();
  const tagsParam = searchParams.get('tags');
  const [selectedTags, setSelectedTags] = useState<string[]>(
    tagsParam?.split(',') || [],
  );

  function isSelected(tagValue: string) {
    return selectedTags.includes(tagValue);
  }

  const router = useRouter();
  function selectTag(tag: TagType) {
    let newTags: string[];
    newTags = selectedTags.includes(tag.value)
      ? selectedTags.filter((tagValue) => tagValue !== tag.value)
      : [...selectedTags, tag.value];

    newTags.length > 0
      ? router.push(`/?tags=${newTags.join(',')}`)
      : router.push('/');

    setSelectedTags(newTags);
  }

  return (
    <div className="mt-4 flex flex-wrap justify-center gap-4">
      {tags?.map((tag) => {
        return (
          <button
            onClick={() => selectTag(tag)}
            className={`whitespace-nowrap rounded-md border-2 p-1 ${
              isSelected(tag.value)
                ? 'border-red-500 text-red-500'
                : 'border-white'
            }`}
            key={tag.value}
          >
            {tag.label}
          </button>
        );
      })}
    </div>
  );
}
