import { useState } from "react";
import useRequest from "src/hooks/useRequest";
import { ID } from "src/types";

interface UpdateProgressHookResult {
  loading: boolean;
  error: boolean;
  requestUpdateProgress: (sectionId: ID) => void;
}

const useUpdateProgress = (
  courseId: number,
  onUpdateProgressSuccess: () => void,
): UpdateProgressHookResult => {
  const updateProgress = useRequest("/update-progress");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const requestUpdateProgress = (sectionId: ID) => {
    setLoading(true);
    setError(false);

    updateProgress({
      requestBody: {
        courseId,
        sectionId,
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
