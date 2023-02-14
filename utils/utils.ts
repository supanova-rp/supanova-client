import { Sections, ServerSideCourses, UserInfoToUpdate, Users } from '@/index';

export const updateUsers = (users: Users, userId: string, userInfoToUpdate: UserInfoToUpdate) => {
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

export const getUpdatedSectionsWithAddedVideoInfoNewCoursesTab = (sections: Sections, sectionId: number, key: string, value: string | number | undefined) => {
  const updatedSections = sections.map((section) => {
    if (sectionId === section.id) {
      return {
        ...section,
        video: {
          ...section.video,
          [key]: value,
        },
      };
    }

    return section;
  });

  return updatedSections;
};

export const getUpdatedSectionsWithAddedVideoInfoExistingCoursesTab = (courses: ServerSideCourses, sectionId: number, key: string, value: string | number | null | undefined) => {
  const updatedCourses = courses.map((course) => {
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
    title: '',
    courseDescription: '',
    sections: [{
      id: Date.now(),
      title: '',
      video: {
        name: '',
        url: null,
        uploadProgress: null,
      },
    }],
    loading: false,
    serverError: null,
    videoMissingError: null,
    successMessage: null,
  };
};
