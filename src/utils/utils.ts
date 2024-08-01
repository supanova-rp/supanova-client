import uuid from "react-uuid";
import {
  API_DOMAIN,
  EMAIL_JS_PUBLIC_KEY,
  EMAIL_JS_SERVICE_ID,
  EMAIL_JS_TEMPLATE_ID,
} from "src/constants/constants";

import {
  UserInfoToUpdate,
  User,
  FirebaseUser,
  AdminTabValue,
} from "../types/index";

export const updateUsers = (
  users: User[],
  userId: string,
  userInfoToUpdate: UserInfoToUpdate,
) => {
  return users.map(user => {
    if (user.id === userId) {
      return {
        ...user,
        ...userInfoToUpdate,
      };
    }

    return user;
  });
};

export const getClassNameSidebarTab = (
  activeTab: string | null,
  tabName: AdminTabValue,
) => {
  if (activeTab === tabName) {
    return "secondary-button";
  }

  return "btn-light sidebar";
};

interface RequestOptions {
  endpoint: string;
  method: "POST" | "PUT" | "DELETE" | "GET";
  requestBody: any;
  currentUser: FirebaseUser | null;
  onRequestBegin?: () => void;
  onSuccess: (result: any) => void;
  onError: (error: string) => void;
  onUnauthorised: () => void;
}

export const request = async ({
  endpoint,
  method,
  requestBody,
  onRequestBegin,
  onSuccess,
  onError,
  onUnauthorised,
  currentUser,
}: RequestOptions) => {
  if (onRequestBegin) {
    onRequestBegin();
  }

  const accessToken = await currentUser?.getIdTokenResult();

  try {
    console.log(
      `sending ${method} request to ${endpoint}, with requestBody: `,
      requestBody,
    );

    const response = await fetch(`${API_DOMAIN}${endpoint}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_token: accessToken?.token,
        ...requestBody,
      }),
    });

    const result = await response.json();

    console.log(`response from ${method} request to ${endpoint}`, response);
    console.log(`result from ${method} request to ${endpoint}`, result);

    if (!result.error) {
      onSuccess(result);
    } else if (response.status === 401) {
      onUnauthorised();
    } else {
      onError(result.error);
    }
  } catch (error) {
    console.log(`error from ${method} request to ${endpoint}`, error);

    onError(error as string);
  }
};

export const getEmailJsParams = (username: string, email: string) => {
  return {
    service_id: EMAIL_JS_SERVICE_ID,
    template_id: EMAIL_JS_TEMPLATE_ID,
    user_id: EMAIL_JS_PUBLIC_KEY,
    template_params: {
      user_name: username,
      user_email: email,
    },
  };
};

export const getAddUsersDefaultState = () => {
  return [
    {
      id: uuid(),
      name: "",
      email: "",
      added: false,
      addUserError: false,
      alreadyRegistered: false,
    },
  ];
};
