export const getDeletedSectionsIds = (course, initialCourse) => {
  // Getting the ids of the deleted sections so the back end can delete them in the table
  const sectionsThatDontExistInEditedCourse = initialCourse.sections.filter(
    section => {
      const sectionExistsInEditedCourse = course.sections.some(
        editedCourseSection => {
          return editedCourseSection.id === section.id;
        },
      );

      if (sectionExistsInEditedCourse) {
        return false;
      }

      return true;
    },
  );

  const idsOfDeletedSections = sectionsThatDontExistInEditedCourse?.map(
    section => section.id,
  );

  return idsOfDeletedSections;
};
