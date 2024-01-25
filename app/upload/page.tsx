'use client';
import { UploadForm } from '@/app/upload/form';
import BackButton from '../ui/back-button';

export default function Page() {
  return (
    <div>
      <BackButton />
      <div className="container mx-auto min-h-screen px-4 text-center">
        <h1>Upload Files to S3 Bucket</h1>
        <UploadForm />
      </div>
    </div>
  );
}
