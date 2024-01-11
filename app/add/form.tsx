import { useFormState } from 'react-dom';
import { uploadFile } from '@/app/add/actions';
import { SubmitButton } from '@/app/add/submit-button';

const initialState = { message: null };

export function UploadForm() {
  const [state, formAction] = useFormState(uploadFile, initialState);

  return (
    <div>
      <form action={formAction}>
        <input type="file" id="file" name="file" accept="images/*" />
        <SubmitButton />
      </form>
      {state?.status && (
        <div className={`state-message ${state?.status}`}>{state?.message}</div>
      )}
    </div>
  );
}
