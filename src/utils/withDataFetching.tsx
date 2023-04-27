/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from "react";

import { API_DOMAIN } from "src/constants/constants";
import { AuthContext, AuthContextType } from "src/contexts/AuthContext";

interface requestOptions {
  endpoint: string,
  onSuccess: (result: any) => void,
  onError: (error: string) => void,
}

const withDataFetching = (WrappedComponent: React.ComponentClass, options: requestOptions) => {
  class WithDataFetching extends Component {
    context: AuthContextType;

    static contextType = AuthContext;

    // componentDidMount () {
    //   this.getData();
    // }

    getData = async () => {
      try {
        const response = await fetch(`${API_DOMAIN}${options.endpoint}`, {
          credentials: "include",
        });

        const result = await response.json();

        if (!result.error) {
          options.onSuccess(result);
        } else {
          if (response.status === 401) {
            const { logout } = this.context;

            logout();
          } else {
            options.onError(result.error);
          }
        }
      } catch (error) {
        options.onError(error as string);
      }
    };

    render() {
      return (
        <WrappedComponent />
      );
    }
  };

  return WithDataFetching;
};

export default withDataFetching;