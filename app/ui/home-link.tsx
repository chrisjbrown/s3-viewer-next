import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function HomeLink() {
  return (
    <div className="mx-4 my-4">
      <Link className="flex" href="/">
        <ArrowLeftIcon className="mr-2 w-4" />
        Home
      </Link>
    </div>
  );
}
