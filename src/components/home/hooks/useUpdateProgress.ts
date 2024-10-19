import { useState } from "react";
import useRequest from "src/hooks/useRequest";

interface UpdateProgressHookResult {
  loading: boolean;
  error: boolean;
  requestUpdateProgress: (index: number) => void;
}

const useUpdateProgress = (
  courseId: number,
  onUpdateProgressSuccess: () => void,
): UpdateProgressHookResult => {
  const updateProgress = useRequest("/update-progress");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const requestUpdateProgress = (updatedSectionIndex: number) => {
    setLoading(true);
    setError(false);

    updateProgress({
      requestBody: {
        courseId,
        updatedSectionIndex,
      },
      onSuccess: () => {
        setLoading(false);
        onUpdateProgressSuccess();
      },
      onError: () => {
        setLoading(false);
        setError(true);
      },
    });
  };

  return { loading, error, requestUpdateProgress };
};

export default useUpdateProgress;
