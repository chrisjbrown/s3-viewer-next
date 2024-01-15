import Image from 'next/image';
import { notFound } from 'next/navigation';
import { fetchImageById } from '@/app/lib/data';
import { DeleteForm } from '@/app/edit/[id]/delete-form';
import { AddTagInput } from '@/app/edit/[id]/add-tag-input';
import { fetchTags } from '@/app/lib/data';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const image = await fetchImageById(parseInt(id));
  const tags = await fetchTags();
  if (!image) {
    notFound();
  }

  return (
    <div className="text-center">
      <h1>{image.title}</h1>
      <Image
        className="mx-auto"
        src={image.url}
        alt={`${image.url} image`}
        width="500"
        height="500"
      />
      <AddTagInput
        allTags={tags}
        initialImageTags={image.tags}
        id={parseInt(id)}
      />
      <DeleteForm id={id} title={image.title} />
    </div>
  );
}
