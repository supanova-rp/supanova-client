import { adminLinkClassname } from "../support/test-constants";

import {
  checkCourseFormIsEmpty,
  cancelAddingNewCourse,
  fillInCourseFormNew,
  checkCourseExistsinEditCourses,
  deleteCourse,
  checkCourseIsDeleted
} from "../support/course-form-utils";
import { login, logout } from "../support/auth-utils";

describe("create a new course", () => {
  beforeEach(() => {
    login();
    cy.get(adminLinkClassname).click();
  });

  it("cancels adding a new course", () => {
    fillInCourseFormNew("Course A", "Description A",[
      {
        title: "Section A",
        video: "cypress/test-video.mp4"
      },
      {
        title: "Section B",
      }
    ]);

    cancelAddingNewCourse();

    checkCourseFormIsEmpty();
  });

  it("saves a new course", () => {
    fillInCourseFormNew("Course A", "Description A", [
      {
        title: "Section A",
        video: "cypress/test-video.mp4"
      }
    ]);

    cy.contains("button", "Save").click();
    cy.get(".add-course-success").should("exist");
    checkCourseFormIsEmpty();
    checkCourseExistsinEditCourses();
    deleteCourse();
    checkCourseIsDeleted("h5", "Course A");
  });

  afterEach(() => {
    logout();
  });
});

export {};