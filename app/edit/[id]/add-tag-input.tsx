'use client';
import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { ActionMeta } from 'react-select';
import type { Tag } from '@prisma/client';

export function AddTagInput({
  allTags,
  initialImageTags,
  id,
}: {
  allTags: Tag[];
  initialImageTags: Tag[];
  id: number;
}) {
  const [isPending, setIsPending] = useState(false);
  const [options, setOptions] = useState(allTags);
  const [imageTags, setImageTags] = useState(initialImageTags);

  async function createTag(label: string) {
    const value = label.toLowerCase().replace(/\W/g, '');

    try {
      const response = await fetch('/api/create-tag', {
        method: 'POST',
        body: JSON.stringify({ label, value, id }),
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('response from create tag', data.tag);
      return data.tag;
    } catch (error) {
      console.log(error);
    }
  }

  async function addTag(tagValue: string) {
    try {
      const response = await fetch('/api/add-tag', {
        method: 'POST',
        body: JSON.stringify({ imageId: id, tagValue: tagValue }),
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('response from add tag', data.tag);
      return data.tag;
    } catch (error) {
      console.log(error);
    }
  }

  async function removeTag(tagValue: string) {
    try {
      const response = await fetch('/api/remove-tag', {
        method: 'POST',
        body: JSON.stringify({ imageId: id, tagValue: tagValue }),
        headers: {
          'content-type': 'application/json',
        },
      });
      console.log('response from remove tag', response);
    } catch (error) {
      console.log(error);
    }
  }

  async function onChange(selected: any, actionMeta: ActionMeta<Tag>) {
    console.log(actionMeta);

    setIsPending(true);
    switch (actionMeta?.action) {
      case 'create-option':
        const createdTag = await createTag(actionMeta?.option?.value);
        setOptions((prev) => [...prev, createdTag]);
        setImageTags((prev: Tag[]) => [...prev, createdTag]);
      case 'select-option':
        if (actionMeta?.option?.value) {
          const addedTag = await addTag(actionMeta?.option?.value);
          setImageTags((prev: Tag[]) => [...prev, addedTag]);
        }
        break;
      case 'remove-value':
        await removeTag(actionMeta?.removedValue?.value);
        setImageTags((prev) =>
          prev.filter(
            (tag: Tag) => tag.value !== actionMeta?.removedValue?.value,
          ),
        );
        break;
      default:
        break;
    }
    setIsPending(false);
  }

  return (
    <CreatableSelect
      styles={{
        // clearIndicator: () => 'bg-slate-900',
        // dropdownIndicator: () => 'text-slate',
        // indicatorsContainer: () => 'text-slate',
        // indicatorSeparator: () => 'text-slate',
        // loadingIndicator: () => 'bg-slate-900',
        // loadingMessage: () => 'bg-slate-900',
        // menu: () => 'bg-slate-900',
        // menuList: () => 'bg-slate-900',
        // menuPortal: () => 'bg-slate-900',
        multiValue: (baseStyles, state) => ({
          ...baseStyles,
          color: 'slategray',
        }),
        multiValueLabel: (baseStyles, state) => ({
          ...baseStyles,
          color: 'slategray',
        }),
        // multiValueRemove: () => 'text-slate',
        // noOptionsMessage: () => 'text-slate',
        option: (baseStyles, state) => ({
          ...baseStyles,
          color: 'slategray',
        }),
        // singleValue: () => 'bg-slate-900',
        // valueContainer: () => 'bg-slate-900',
      }}
      isMulti
      isClearable={false}
      isDisabled={isPending}
      isLoading={isPending}
      options={options}
      value={imageTags}
      onChange={onChange}
    />
  );
}
