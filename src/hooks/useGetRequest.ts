/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from "src/contexts/AuthContext";
import { getRequest } from "src/utils/utils";

interface RequestOptions {
  onSuccess: (result: any) => void,
  onError: (error: string) => void,
}

const useGetRequest = (endpoint: string) => {
  const { logout } = useAuth();

  return ({ onSuccess, onError }: RequestOptions) => {
    getRequest({
      endpoint,
      onSuccess,
      onError,
      onUnauthorised: logout
    });
  };
};

export default useGetRequest;