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

export const useQuery = <T>(
  endpoint: string,
  options: RequestOptions<T>,
): QueryResult<T> => {
  const makeRequest = useRequest(endpoint);
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  const { requestBody, defaultError, onRequestBegin, onError, onSuccess } =
    options;

  const getError = (err: any): string => {
    if (defaultError) {
      return defaultError;
    }

    if (typeof err === "string") {
      return err;
    }

    return err?.message || "An error occurred";
  };

  const handleError = (err: any) => {
    const errorMessage = getError(err);

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
        requestBody,
        onSuccess: (result: T) => {
          setData(result);
          setLoading(false);

          if (onSuccess) {
            onSuccess(result);
          }
        },
        onError: handleError,
      });
    } catch (err: any) {
      handleError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, refetch: fetchData, loading, error };
};
