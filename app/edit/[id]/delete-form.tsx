'use client';
import { deleteImageById as deleteImage } from '@/app/edit/[id]/actions';
import { useFormState, useFormStatus } from 'react-dom';

export function DeleteForm({ id }: { id: string }) {
  const initialState = { status: '', message: '' };
  const deleteImageById = deleteImage.bind(null, id);
  const [state, dispatchDelete] = useFormState(deleteImageById, initialState);
  const { pending } = useFormStatus();

  return (
    <form action={dispatchDelete}>
      <button>{pending ? 'Deleting' : 'Delete'}</button>
      {state.status === 'error' && (
        <p className="mt-2 text-sm text-red-500" key={state.message}>
          {state.message}
        </p>
      )}
    </form>
  );
}
