import { useFormState } from 'react-dom';
import { uploadFiles } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';
import { useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';

const initialState = { message: null };

export function UploadForm() {
  const [files, updateFiles] = useState<File[]>([]);
  const [state, dispatchUploadFiles] = useFormState(uploadFiles, initialState);

  function onAddFiles(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) {
      return; // User canceled file selection
    }

    const newFiles = Array.from(event.target.files);
    updateFiles([...files, ...newFiles]);
  }

  function onDeleteFile(fileName: string) {
    updateFiles(files.filter((file) => file.name !== fileName));
  }

  async function onSubmit(formData: FormData) {
    files.forEach((file) => {
      formData.append('files', file);
    });
    await dispatchUploadFiles(formData);
    updateFiles([]);
  }

  return (
    <div>
      <form className="my-5" action={onSubmit}>
        <input
          hidden
          type="file"
          id="file"
          name="file"
          multiple={true}
          onChange={onAddFiles}
          accept="images/*"
        />

        {files.map((file: File) => (
          <div key={file.name}>
            <span>{file.name}</span>
            <button className="ml-2 w-4 cursor-pointer hover:text-red-500">
              <TrashIcon onClick={() => onDeleteFile(file.name)} />
            </button>
          </div>
        ))}

        <label
          className="rounded-lg bg-blue-600 px-4 font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          htmlFor="file"
        >
          Choose files
        </label>
        <Button
          styles="ml-auto flex h-10 items-center rounded-lg bg-blue-600 px-4 font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          text="Submit"
        />
      </form>
      {state?.status && <div>{state?.message}</div>}
    </div>
  );
}
