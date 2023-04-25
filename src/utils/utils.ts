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

export const getUpdatedCourses = (courses: Course[], sectionId: number, key: string, value: string | number | null | undefined) => {
  const updatedCourses = courses.map((course) => {
    return {
      ...course,
      sections: getUpdatedSections(course.sections, sectionId, key, value),
    };
  });

  return updatedCourses;
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

export const getUpdatedCoursesWithEditFlagRemovedForEditedCourse = (editedCourseId: number, allCourses: Course[]) => {
  const updatedCoursesWithEditFlagRemovedForEditedCourse = allCourses.map((course) => {
    if (course.id === editedCourseId) {
      return {
        ...course,
        isEditing: false,
      };
    }

    return course;
  });

  return updatedCoursesWithEditFlagRemovedForEditedCourse;
};

interface GetRequestOptions {
  endpoint: string,
  onSuccess: (result: Course[]) => void,
  onError: (error: string) => void,
}

export const getRequest = async ({ endpoint, onSuccess, onError }: GetRequestOptions) => {
  try {
    const response = await fetch(`${API_DOMAIN}${endpoint}`, {
      credentials: "include",
    });

    const result = await response.json();

    if (!result.error) {
      onSuccess(result);
    } else {
      onError(result.error);
    }
  } catch (e) {
    onError(e as string);
  }
};