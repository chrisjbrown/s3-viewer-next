import Image from 'next/image';
import { notFound } from 'next/navigation';
import { fetchImageById } from '@/app/lib/data';
import { DeleteForm } from '@/app/edit/[id]/delete-form';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const image = await fetchImageById(id);
  if (!image) {
    notFound();
  }

  return (
    <div>
      <h1>{image.title}</h1>
      <Image
        src={image.url}
        alt={`${image.url} image`}
        width="500"
        height="500"
      />
      <DeleteForm id={id} title={image.title} />
    </div>
  );
}
