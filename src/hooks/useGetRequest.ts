/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_DOMAIN } from "src/constants/constants";
import { useAuth } from "src/contexts/AuthContext";

interface RequestOptions {
  onSuccess: (result: any) => void,
  onError: (error: string) => void,
}

const useGetRequest = (endpoint: string) => {
  const { logout } = useAuth();

  const getRequest = async ({ onSuccess, onError } : RequestOptions) => {
    try {
      const response = await fetch(`${API_DOMAIN}${endpoint}`, {
        credentials: "include",
      });

      const result = await response.json();

      if (!result.error) {
        onSuccess(result);
      } else {
        if (response.status === 401) {
          logout();
        } else {
          onError(result.error);
        }
      }
    } catch (error) {
      onError(error as string);
    }
  };

  return getRequest;
};

export default useGetRequest;