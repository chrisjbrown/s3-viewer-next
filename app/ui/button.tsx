'use client';

import { useFormStatus } from 'react-dom';

export function Button({
  text,
  onClick,
  styles,
}: {
  text: string;
  onClick?: React.MouseEventHandler;
  styles?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      className={styles}
      type="submit"
      aria-disabled={pending}
      onClick={onClick}
    >
      {pending ? 'Pending...' : text}
    </button>
  );
}
