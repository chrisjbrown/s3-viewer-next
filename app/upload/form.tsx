import { useFormState } from 'react-dom';
import { uploadFile } from '@/app/lib/actions';
import { Button } from '@/app/ui/button';

const initialState = { message: null };

export function UploadForm() {
  const [state, formAction] = useFormState(uploadFile, initialState);

  return (
    <div>
      <form className="my-5" action={formAction}>
        <input hidden type="file" id="file" name="file" accept="images/*" />
        <label
          className="rounded-lg bg-blue-600 px-4 font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          htmlFor="file"
        >
          Choose a file
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
