export const updateUsers = (users, userId: string, userInfoToUpdate) => {
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

export const getUpdatedSectionsWithAddedVideoInfo = (sections, sectionId: string, key: string, value) => {
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
