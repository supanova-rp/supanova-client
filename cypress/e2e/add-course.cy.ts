import { adminCourseFormInputClassnames, adminLinkClassname } from "../support/test-constants";
import {
  checkCourseFormIsEmpty,
  cancelAddingNewCourse,
  checkCourseExistsinEditCourses,
  deleteCourse,
  checkCourseIsDeleted,
  fillInCourseForm,
  fillInCourseFormSaveBeforeVideoUploadCompleted,
} from "../support/course-form-utils";
import { loginAdmin, logoutAdmin } from "../support/auth-utils";

describe("Create a new course", () => {
  const { courseSectionElement } = adminCourseFormInputClassnames;

  beforeEach(() => {
    loginAdmin();
    cy.get(adminLinkClassname).click();
  });

  it("cancels adding a new course", () => {
    fillInCourseForm("Course A", "Description A",[
      {
        title: "Section A",
        video: "cypress/short-test-video.mp4"
      },
      {
        title: "Section B",
      }
    ]);

    cancelAddingNewCourse();

    checkCourseFormIsEmpty();
  });

  it("saves a new course", () => {
    const sectionsAdded = [
      {
        title: "Section A",
        video: "cypress/short-test-video.mp4"
      },
      {
        title: "Section B",
      },
    ];

    const lastSection = sectionsAdded.length - 1;

    fillInCourseFormSaveBeforeVideoUploadCompleted("Course A", "Description A", [...sectionsAdded]);

    cy.get(".remove-icon").eq(lastSection).click();
    cy.get(".remove-icon").should("not.exist");
    cy.get(courseSectionElement).eq(lastSection).should("not.exist");

    cy.contains("button", "Save").click();
    cy.findByText("Please make sure videos are uploaded for every section.").should("not.exist");
    cy.get(".add-course-success").should("exist");

    checkCourseFormIsEmpty();
    checkCourseExistsinEditCourses();
    deleteCourse();
    checkCourseIsDeleted("h5", "Course A");
  });

  afterEach(() => {
    logoutAdmin();
  });
});

export {};