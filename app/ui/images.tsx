import Image from 'next/image';
import Link from 'next/link';
import { getImagesByTags } from '@/app/lib/data';
import { Image as ImageType } from '@prisma/client';

export default async function Images({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const tagsParam = searchParams.tags;
  const images: ImageType[] = await getImagesByTags(
    tagsParam?.split(',') || [],
  );

  return (
    <>
      {images?.map((image) => {
        return (
          <Link key={image.id} href={`/edit/${image.id}`} passHref>
            <Image src={image.url} alt={image.title} width={300} height={300} />
          </Link>
        );
      })}
    </>
  );
}
