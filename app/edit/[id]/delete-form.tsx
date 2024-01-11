'use client';
import { deleteImageById as deleteImage } from '@/app/lib/actions';
import { useFormState, useFormStatus } from 'react-dom';
import { SubmitButton } from '@/app/ui/submit-button';

const initialState = { message: '', status: '' };

export function DeleteForm({ id, title }: { id: string; title: string }) {
  const deleteImageById = deleteImage.bind(null, id, title);
  const [state, dispatchDelete] = useFormState(deleteImageById, initialState);
  const { pending } = useFormStatus();

  return (
    <form action={dispatchDelete}>
      <SubmitButton text="Delete" />
      {state?.status === 'error' && (
        <p className="mt-2 text-sm text-red-500">{state.message}</p>
      )}
    </form>
  );
}
