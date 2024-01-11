import { useFormState } from 'react-dom';
import { uploadFile } from '@/app/lib/actions';
import { SubmitButton } from '@/app/ui/submit-button';

const initialState = { message: null };

export function UploadForm() {
  const [state, formAction] = useFormState(uploadFile, initialState);

  return (
    <div>
      <form action={formAction}>
        <input type="file" id="file" name="file" accept="images/*" />
        <SubmitButton text="Submit" />
      </form>
      {state?.status && <div>{state?.message}</div>}
    </div>
  );
}
