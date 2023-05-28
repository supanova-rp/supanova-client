import { ReactElement, useEffect } from "react";
import useRequest from "../hooks/useRequest";

type Props = {
  render: (r: any) => ReactElement<any, any> | null,
  endpoint: string,
  requestOnMount?: boolean,
  onSuccess: (d: any) => void,
  onRequestBegin: () => void,
  onError: (e: string) => void,
}

const RequestWrapper: React.FC<Props> = ({
  render,
  endpoint,
  requestOnMount = false,
  onRequestBegin,
  onSuccess,
  onError,
}) => {
  const request = useRequest(endpoint);

  useEffect(() => {
    if (requestOnMount) {
      request({ onRequestBegin, onError, onSuccess });
    }
  }, []);

  const executeRequest = (requestBody = {}) => {
    request({ requestBody, onRequestBegin, onError, onSuccess });
  };

  return render(executeRequest);
};

export default RequestWrapper;
