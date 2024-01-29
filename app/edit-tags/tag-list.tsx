'use client';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Tag as TagType } from '@prisma/client';
import { useState } from 'react';
import { Button } from '@/app/ui/button';
import BackButton from '@/app/ui/back-button';
import { addTag, deleteTag } from '@/app/lib/actions';
import React from 'react';

export default function TagList({ initialTags }: { initialTags: TagType[] }) {
  const [pendingTags, updatePendingTags] = useState<string[]>([]);
  const [tagInput, updateTagInput] = useState('');

  function onTagInput(event: React.ChangeEvent<HTMLInputElement>) {
    updateTagInput(event.target.value);
  }

  async function onAddTag(formData: FormData) {
    await addTag(formData);
    updateTagInput('');
  }

  async function onDelete(tagValue: string) {
    updatePendingTags([...pendingTags, tagValue]);
    await deleteTag(tagValue);
    updatePendingTags(pendingTags.filter((tag) => tag !== tagValue));
  }

  return (
    <div>
      <BackButton />
      <div>
        {initialTags.map((tag) => {
          const isDisabled = pendingTags.includes(tag.value);
          return (
            <div
              key={tag.value}
              className={`flex justify-center text-2xl ${
                isDisabled
                  ? 'cursor-wait text-slate-400'
                  : 'cursor-pointer hover:text-red-500'
              } `}
            >
              {tag.label}
              <button disabled={isDisabled} className="ml-2 w-4">
                <TrashIcon onClick={() => onDelete(tag.value)} />
              </button>
            </div>
          );
        })}
      </div>
      <form action={onAddTag}>
        <input
          name="tagLabel"
          className="mt-4 text-slate-800"
          type="text"
          value={tagInput}
          onChange={onTagInput}
        />
        <Button
          styles="ml-4 h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          text="Submit"
        />
      </form>
    </div>
  );
}
