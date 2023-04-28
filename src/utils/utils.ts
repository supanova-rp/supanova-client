/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_DOMAIN } from "src/constants/constants";
import { Course, CourseSection, UserInfoToUpdate, User } from "../types/index";

export const updateUsers = (users: User[], userId: string, userInfoToUpdate: UserInfoToUpdate) => {
  return users.map((user) => {
    if (user.id === userId) {
      return {
        ...user,
        ...userInfoToUpdate,
      };
    }

    return user;
  });
};

export const getClassNameSidebarTab = (activeTab: string, tabName: string) => {
  if (activeTab === tabName) {
    return "secondary-button";
  }

  return "btn-light sidebar";
};

export const getUpdatedSections = (sections: CourseSection[], sectionId: number, key: string, value: string | number | null | undefined) => {
  const updatedSections = sections.map((section) => {
    if (sectionId === section.id) {
      return {
        ...section,
        [key]: value,
      };
    }

    return section;
  });

  return updatedSections;
};

export const getUpdatedCourse = (course: Course, sectionId: number, key: string, value: string | number | null | undefined) => {
  return {
    ...course,
    sections: getUpdatedSections(course.sections, sectionId, key, value),
  };
};

export const getInitialCourseState = () => {
  return {
    id: Date.now(),
    title: "",
    description: "",
    isEditing: false,
    sections: [
      {
        id: Date.now(),
        title: "",
        videoUrl: null,
        uploadProgress: null,
      },
    ],
    loading: false,
    error: {
      message: null,
      type: null,
    },
    successMessage: null,
  };
};

export const areSomeVideosCurrentlyUploading = (editedCourse: Course) => {
  return editedCourse.sections.some((section) => {
    return typeof section.uploadProgress === "number" && section.uploadProgress < 1;
  });
};

interface GetRequestOptions {
  endpoint: string,
  onSuccess: (result: any) => void,
  onError: (error: string) => void,
  onUnauthorised: () => void,
}

export const getRequest = async ({ endpoint, onSuccess, onError, onUnauthorised }: GetRequestOptions) => {
  try {
    const response = await fetch(`${API_DOMAIN}${endpoint}`, {
      credentials: "include",
    });

    const result = await response.json();

    if (!result.error) {
      onSuccess(result);
    } else {
      if (response.status === 401) {
        onUnauthorised();
      } else {
        onError(result.error);
      }
    }
  } catch (error) {
    onError(error as string);
  }
};

interface RequestOptions {
  endpoint: string,
  method: string,
  requestBody: any,
  onSuccess: (result: any) => void,
  onError: (error: string) => void,
  onUnauthorised: () => void,
}

export const request = async ({ endpoint, method, requestBody, onSuccess, onError, onUnauthorised} : RequestOptions) => {
  try {
    const response = await fetch(`${API_DOMAIN}${endpoint}`, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();

    if (!result.error) {
      onSuccess(result);

    } else {
      if (response.status === 401) {
        onUnauthorised();
      } else {
        onError(result.error);
      }
    }
  } catch (error) {
    onError(error as string);
  }
};