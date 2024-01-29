import Link from 'next/link';
import Loading from '@/app/ui/loading';
import Tags from './ui/tags';
import { Suspense } from 'react';
import Images from './ui/images';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { fetchTags } from '@/app/lib/data';

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const tags = await fetchTags();

  return (
    <main className="flex min-h-screen flex-col">
      <h1 className="w-full text-center text-5xl">S3 viewer</h1>
      <div className="mt-4 flex grow flex-col">
        <div>
          <h2 className="text-center text-3xl">Images</h2>
        </div>
        <div className="rounded-md border-2 border-white p-2">
          <h2 className="text-md flex w-full items-center justify-center text-3xl">
            Tags
            <a href="/edit-tags">
              <PencilSquareIcon className=" ml-2 w-4" />
            </a>
          </h2>
          <Tags tags={tags} />
        </div>
        <div className="mx-auto mt-4 grid grid-cols-4 justify-center gap-6">
          <Suspense fallback={<Loading />}>
            <Images searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
      <div>
        <Link
          className="flex w-full justify-center bg-stone-800 p-2 text-white"
          href={`/upload`}
          passHref
        >
          Upload
        </Link>
      </div>
    </main>
  );
}
