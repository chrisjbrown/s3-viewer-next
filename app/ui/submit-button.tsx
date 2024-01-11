'use client';

import { useFormStatus } from 'react-dom';

export function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      type="submit"
      aria-disabled={pending}
    >
      {pending ? 'Pending...' : text}
    </button>
  );
}
