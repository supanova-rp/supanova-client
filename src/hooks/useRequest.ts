import { useAuth } from "src/contexts/AuthContext";
import { request } from "src/utils/utils";

interface RequestOptions {
  requestBody?: any,
  onRequestBegin?: () => void,
  onSuccess: (result: any) => void,
  onError: (error: string) => void,
}

const useRequest = (endpoint: string) => {
  const { currentUser, logout } = useAuth();

  return ({ requestBody, onRequestBegin, onSuccess, onError }: RequestOptions) => {
    request({
      method: "POST",
      endpoint,
      requestBody: {
        access_token: currentUser?.accessToken,
        ...requestBody,
      },
      onRequestBegin,
      onSuccess,
      onError,
      onUnauthorised: logout
    });
  };
};

export default useRequest;
