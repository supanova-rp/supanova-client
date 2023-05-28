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
  return  {
    id: Date.now(),
    title: "",
    description: "",
    sections: [
      {
        id: Date.now(),
        title: "",
        videoUrl: null,
        uploadProgress: null,
      },
    ],
  };
};

export const isVideoUploadInProgress = (course: Course) => {
  return course.sections.some((section) => {
    return typeof section.uploadProgress === "number" && section.uploadProgress < 1;
  });
};

export const everySectionHasVideo = (course: Course) => {
  return course.sections.every((section) => section.videoUrl);
};

export const getDeletedSectionsIds = (course: Course, initialCourse: Course) => {
  // Getting the ids of the deleted sections so the back end can delete them in the table
  const sectionsThatDontExistInEditedCourse = initialCourse.sections.filter((section) => {
    const sectionExistsInEditedCourse = course.sections.some((editedCourseSection) => {
      return editedCourseSection.id === section.id;
    });

    if (sectionExistsInEditedCourse) {
      return false;
    }

    return true;
  });

  const idsOfDeletedSections = sectionsThatDontExistInEditedCourse?.map((section) => section.id);

  return idsOfDeletedSections;
};

export const getSectionsWithPositions = (course: Course) => {
  const sectionsWithPositions = course.sections.map((section, index) => {
    return {
      ...section,
      position: index,
    };
  });

  return sectionsWithPositions;
};

interface RequestOptions {
  endpoint: string,
  method: string,
  requestBody: any,
  onRequestBegin?: () => void,
  onSuccess: (result: any) => void,
  onError: (error: string) => void,
  onUnauthorised: () => void,
}

export const request = async ({
  endpoint,
  method,
  requestBody,
  onRequestBegin,
  onSuccess,
  onError,
  onUnauthorised
} : RequestOptions) => {
  if (onRequestBegin) {
    onRequestBegin();
  }

  try {
    const response = await fetch(`${API_DOMAIN}${endpoint}`, {
      method,
      headers: { "Content-Type": "application/json" },
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