import Image from 'next/image';
import Link from 'next/link';
import { Image as ImageType } from '@prisma/client';

type Props = {
  images?: ImageType[];
};

export default async function ImageList({ images }: Props) {
  return (
    <>
      {images?.map((image) => {
        return (
          <Link
            className="card"
            key={image.id}
            href={`/edit/${image.id}`}
            passHref
          >
            <Image src={image.url} alt={image.title} width={200} height={200} />
          </Link>
        );
      })}
    </>
  );
}
