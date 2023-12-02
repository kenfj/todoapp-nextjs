import { HTTPError } from 'ky';
import { showError } from '@/utils/showMessage';
import { ProblemDetail } from '@/models/ProblemDetail';

// https://swr.vercel.app/ja/docs/error-handling#global-error-report
export const swrErrorHandler = async (error: Error, key: string) => {
  console.error("error.name: " + error.name);

  if (error instanceof HTTPError) {
    const errClone = error.response.clone()
    const pd = await errClone.json() as ProblemDetail

    showError(`${pd.detail} (${pd.status})`);

    for (const err of pd.fieldErrors ?? []) {
      const msg = `${err.field}: ${err.message}`
      showError(msg);
    }
  } else {
    // TypeError or AbortError in Fetch API
    showError(`${error.name}: ${error.message}`);
  }
}
