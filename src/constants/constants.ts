export const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;

export const ADMINS_TABS = {
  ADD_COURSE: "Add Course",
  EDIT_COURSES: "Edit Courses",
  ASSIGN_USERS: "Assign Users",
  ADD_USERS: "Add Users",
};

export const HOME_TABS = {
  COURSES: "Courses",
  INSTRUCTOR: "Instructor",
};

export const EMAIL_JS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
export const EMAIL_JS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
export const EMAIL_JS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const unauthedRoutes = ["/register", "/forgot-password"];

export const feedbackMessages = {
  videoMissing: "Every section needs a video.",
  addCourseSuccess: "Successfully created a new course!",
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
