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
  title: "Radiation Advanced",
  sections: [
    {
      title: "Introduction",
    },
    {
      title: "Definitions"
    },
    {
      title: "Conclusion",
    }
  ]
};

export const feedbackMessages = {
  videoMissing: "Every section needs a video.",
  addCourseSuccess: "You successfully created a new course!",
  saveCourseError: "Failed to save course. Try again.",
  saveCourseSuccess: "Successfully saved course!",
  deleteCourseError: "Failed to delete course. Try again.",
  deleteCourseSuccess: "Successfully deleted course!",
  saveChangesError: "Failed to save changes. Try again.",
  passwordMismatch: "Passwords don't match.",
  passwordResetSuccess: "Password reset. Check your inbox.",
  passwordResetError: "Failed to reset password. Try again.",
  accountInvalid: "Account doesn't exist. Please register first.",
  accountAlreadyExists: "Account already exists. Log in instead.",
  registrationError: "Failed to create an account. Try again.",
  loginError: "Login failed. Try again.",
  loginValidationError: "Wrong email and/or password.",
  logoutError: "Failed to log out. Please try again."
};

