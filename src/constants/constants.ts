import { ReactComponent as HomeIcon } from "../icons/homeIcon.svg";
import { ReactComponent as AddUserIcon } from "../icons/addUserIcon.svg";
import { ReactComponent as EditCourseIcon } from "../icons/editCourseIcon.svg";
import { ReactComponent as AddCourseIcon } from "../icons/addCourseIcon.svg";
import { ReactComponent as AssignUserIcon } from "../icons/assignUserIcon.svg";

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
  correctAnswerMissing: "Every quiz question needs a correct answer.",
  getEditCourseError: "Failed to load course.",
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

const { ADD_COURSE, ADD_USERS, ASSIGN_USERS, EDIT_COURSES } = ADMINS_TABS;

export const bottomMobileNavbarIcons = [
  {
    id: 1,
    icon: AddCourseIcon,
    tabName: ADD_COURSE,
  },
  {
    id: 2,
    icon: EditCourseIcon,
    tabName: EDIT_COURSES,
  },
  {
    id: 3,
    icon: AssignUserIcon,
    tabName: ASSIGN_USERS,
  },
  {
    id: 4,
    icon: AddUserIcon,
    tabName: ADD_USERS,
  },
  {
    id: 5,
    icon: HomeIcon,
    tabName: null,
  },
];