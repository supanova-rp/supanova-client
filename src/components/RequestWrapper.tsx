import { ReactElement, useEffect } from "react";
import useRequest from "../hooks/useRequest";

type Props = {
  render: (r: any) => ReactElement<any, any> | null,
  endpoint: string,
  skip?: boolean,
  requestOnMount?: boolean,
  requestBody?: any,
  onSuccess: (d: any) => void,
  onRequestBegin: () => void,
  onError: (e: string) => void,
}

const RequestWrapper: React.FC<Props> = ({
  render,
  endpoint,
  skip,
  requestOnMount = false,
  requestBody,
  onRequestBegin,
  onSuccess,
  onError,
}) => {
  const request = useRequest(endpoint);

  useEffect(() => {
    if (requestOnMount && !skip) {
      request({ requestBody, onRequestBegin, onError, onSuccess });
    }
  }, []);

  const executeRequest = (requestBody = {}) => {
    request({ requestBody, onRequestBegin, onError, onSuccess });
  };

  return render(executeRequest);
};

export default RequestWrapper;
