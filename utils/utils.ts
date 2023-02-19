import { Course, CourseSection, UserInfoToUpdate, User } from '@/index';

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
    return 'btn-primary';
  }

  return 'btn-light admin-tab';
};

export const getUpdatedSectionsWithAddedVideoInfoNewCoursesTab = (sections: CourseSection[], sectionId: number, key: string, value: string | number | undefined) => {
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

export const getUpdatedSectionsWithAddedVideoInfoExistingCoursesTab = (courses: Course[], sectionId: number, key: string, value: string | number | null | undefined) => {
  const updatedCourses = courses.map((course) => {
    // Marie TODO: we could use the function above to update the sections and
    // maybe rename this something a bit more generic
    const sectionWithUpdatedVideoUrl = course.sections.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          [key]: value,
        };
      }

      return section;
    });

    return {
      ...course,
      sections: sectionWithUpdatedVideoUrl,
    };
  });

  return updatedCourses;
};

export const getInitialCourseState = () => {
  return {
    id: Date.now(),
    title: '',
    description: '',
    isEditing: false,
    sections: [
      {
        id: Date.now(),
        title: '',
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
