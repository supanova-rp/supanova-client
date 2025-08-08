import { useState } from "react";

import useRequest from "./useRequest";

interface RequestOptions<T> {
  requestBody?: any;
  defaultError?: string;
  onRequestBegin?: () => void;
  onSuccess?: (result: T) => void;
  onError?: (error: string) => void;
}

interface LazyQueryResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  request: (overrideRequestBody?: any) => void;
}

export const useLazyQuery = <T>(
  endpoint: string,
  options?: RequestOptions<T>,
): LazyQueryResult<T> => {
  const makeRequest = useRequest(endpoint);
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { requestBody, defaultError, onRequestBegin, onSuccess, onError } =
    options || {};

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

  const request = (overrideRequestBody?: any) => {
    setLoading(true);
    setError(null);
    if (onRequestBegin) {
      onRequestBegin();
    }

    try {
      makeRequest({
        requestBody: overrideRequestBody ?? requestBody,
        onSuccess: (result: T) => {
          setData(result);
          setLoading(false);
          if (onSuccess) {
            onSuccess(result);
          }
        },
        onError: err => {
          handleError(err);
          setLoading(false);
        },
      });
    } catch (err: any) {
      handleError(err);
      setLoading(false);
    }
  };

  return { data, loading, error, request };
};
