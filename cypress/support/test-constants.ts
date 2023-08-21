export const adminLinkClassname  = ".link-light.nav-link.admin";
export const logoutLinkClassname  = ".link-light.nav-link.logout";
export const loginEmailInputClassname = ".text-input input";
export const loginPasswordInputClassname = ".password-input input";
export const adminCourseFormInputClassnames = {
  courseTitleElement: ".course-title input",
  courseDescriptionElement: ".course-description input",
  courseSectionElement: ".section-input input[type='text']",
};
export const adminCoursesListClassnames = {
  courseListTitleElement: ".courses-list-course-title",
  courseListSectionElement: ".courses-list-section-title"
};

export const initialDefaultCourse = {
  title: "Radiation Basics",
  sections: [
    {
      title: "Intro",
    },
    {
      title: "Outro"
    }
  ]
};
