import AddCourseIcon from "../assets/icons/addCourseIcon.svg?react";
import AssignUserIcon from "../assets/icons/assignUserIcon.svg?react";
import EditCourseIcon from "../assets/icons/editCourseIcon.svg?react";
import HomeIcon from "../assets/icons/homeIcon.svg?react";

export const API_DOMAIN = import.meta.env.VITE_API_DOMAIN;

export const ADMINS_TABS = {
  ADD_COURSE: "Add Course",
  EDIT_COURSES: "Edit Courses",
  ASSIGN_USERS: "Assign Users",
  REGISTER_USER: "Register Users",
};

export enum CourseTabs {
  Courses = "Courses",
  Instructor = "Instructor",
}

export const unauthedRoutes = ["/login", "/reset-password"];

export const feedbackMessages = {
  genericError: "Oops something went wrong!",
  genericErrorTryAgain: "Oops something went wrong! Try again.",
  videoMissing: "Every section needs a video.",
  correctAnswerMissing: "Every quiz question needs a correct answer.",
  getProgressError: "Oops something went wrong! Failed to get course progress.",
  getMaterialsError:
    "Oops something went wrong! Failed to get course materials.",
  getCourseError: "Oops something went wrong! Failed to get course.",
  getEditCourseError: "Failed to load course.",
  addCourseSuccess: "Successfully created a new course!",
  saveCourseError: "Failed to save course. Try again.",
  saveCourseSuccess: "Successfully saved course!",
  deleteCourseError: "Failed to delete course. Try again.",
  deleteCourseSuccess: "Successfully deleted course!",
  saveChangesError: "Failed to save changes. Try again.",
  quizStateLoadError: "Failed to retrieve saved quiz answers",
  passwordMismatch: "Passwords don't match.",
  passwordResetSuccess: "Password reset. Check your inbox.",
  passwordResetError: "Failed to reset password. Try again.",
  accountInvalid: "Account doesn't exist. Please register first.",
  accountAlreadyExists: "Account already exists. Log in instead.",
  accountAlreadyExistsRegisterUser: "This email address is already in use",
  registrationError: "Failed to create an account. Try again.",
  loginError: "Login failed. Try again.",
  loginValidationError: "Wrong email and/or password.",
  logoutError: "Failed to log out. Please try again.",
  notFoundError: "The page you were looking for could not be found...",
  adminVerificationError: "Failed to very if user is Admin.",
};

const { ADD_COURSE, ASSIGN_USERS, EDIT_COURSES } = ADMINS_TABS;

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
    id: 5,
    icon: HomeIcon,
    tabName: null,
  },
];

export const REACT_TOAST_DURATION = { duration: 2000 };
