'use client';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function BackButton() {
  const router = useRouter();

  return (
    <div className="mx-4 my-4">
      <button className="flex" onClick={() => router.back()}>
        <ArrowLeftIcon className="mr-2 w-4" />
        Back
      </button>
    </div>
  );
}
