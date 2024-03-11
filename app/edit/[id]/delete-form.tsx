'use client';
import { deleteImageById as deleteImage } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { Button } from '@/app/ui/button';

const initialState = { message: '', status: '' };

export function DeleteForm({
  id,
  title,
  style,
  // onDeleteImage,
}: {
  id: number;
  title: string;
  // onDeleteImage: Function;
  style?: string;
}) {
  const deleteImageById = deleteImage.bind(null, id, title);
  const [state, dispatchDelete] = useFormState(deleteImageById, initialState);

  function formAction() {
    dispatchDelete();
    // onDeleteImage();
  }

  return (
    <form className={style} action={formAction}>
      <Button
        styles="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        text="Delete Image"
      />
      {state?.status === 'error' && (
        <p className="mt-2 text-sm text-red-500">{state.message}</p>
      )}
    </form>
  );
}
