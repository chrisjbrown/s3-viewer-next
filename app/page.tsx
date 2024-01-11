import prisma from '@/app/lib/prisma';
import Link from 'next/link';
import ImageList from '@/app/ui/image-list';

async function getImages() {
  const images = await prisma.image.findMany();
  return images;
}
export default async function Page() {
  const images = await getImages();

  return (
    <main className="flex min-h-screen flex-col">
      <h1>S3 viewer</h1>
      <div className="mt-4 flex grow flex-col gap-4">
        <div>
          <h2 className="text-center">Images</h2>
        </div>
        <ImageList images={images} />
      </div>
      <div>
        <form className="flex flex-col items-center justify-center bg-stone-800 p-2 text-white shadow">
          <Link href={`/add`} passHref>
            Upload
          </Link>
        </form>
      </div>
    </main>
  );
}
