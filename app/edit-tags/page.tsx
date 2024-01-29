import { fetchTags } from '@/app/lib/data';
import { Tag as TagType } from '@prisma/client';
import TagList from '@/app/edit-tags/tag-list';
import { Suspense } from 'react';
import Loading from '@/app/ui/loading';

export default async function Page() {
  const tags: TagType[] = await fetchTags();
  return (
    <div className="mt-3 text-center">
      <h1 className="text-5xl">edit tags</h1>
      <Suspense fallback={<Loading />}>
        <TagList initialTags={tags} />
      </Suspense>
    </div>
  );
}
