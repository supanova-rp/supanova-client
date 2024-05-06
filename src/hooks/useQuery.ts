import { useEffect, useState } from "react";
import useRequest from "./useRequest";

interface RequestOptions<T> {
  requestBody?: any;
  defaultError?: string;
  onRequestBegin?: () => void;
  onSuccess?: (result: T) => void;
  onError?: (error: string) => void;
}

interface QueryResult<T> {
  data: T | null;
  loading: boolean;
  error: null | string;
  refetch: () => void;
}

export const useQuery = <T>(endpoint: string, options: RequestOptions<T>): QueryResult<T> => {
  const makeRequest = useRequest(endpoint);
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  const { requestBody, defaultError, onRequestBegin, onError, onSuccess } = options;

  const getError = (error: any): string => {
    if (defaultError) {
      return defaultError;
    }

    if (typeof error === "string") {
      return error;
    }

    return error?.message || "An error occurred";
  };

  const handleError = (error: any) => {
    const errorMessage = getError(error);

    setError(errorMessage);

    if (onError) {
      onError(errorMessage);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (onRequestBegin) {
        onRequestBegin();
      }

      makeRequest({
        requestBody: requestBody,
        onSuccess: (result: T) => {
          setData(result);
          setLoading(false);

          if (onSuccess) {
            onSuccess(result);
          }
        },
        onError: handleError,
      });
    } catch (error: any) {
      handleError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, refetch: fetchData, loading, error };
};
