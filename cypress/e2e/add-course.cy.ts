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
import { feedbackMessages } from "../support/test-constants";

describe("Create a new course", () => {
  const { courseSectionElement } = adminCourseFormInputClassnames;

  beforeEach(() => {
    loginAdmin();
    cy.get(adminLinkClassname).click();
  });

  it("cancels adding a new course", () => {
    fillInCourseForm("Course XYZ", "Description A",[
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

    fillInCourseFormSaveBeforeVideoUploadCompleted("Course XYZ", "Description A", [...sectionsAdded]);

    cy.get(".remove-icon").eq(lastSection).click();
    cy.get(".remove-icon").should("not.exist");
    cy.get(courseSectionElement).eq(lastSection).should("not.exist");

    cy.wait(2000);
    cy.contains("button", "Save").click();
    cy.findByText(feedbackMessages.addCourseSuccess).should("exist");
    cy.findByText(feedbackMessages.videoMissing).should("not.exist");

    checkCourseFormIsEmpty();
    checkCourseExistsinEditCourses();
    deleteCourse();
    checkCourseIsDeleted("h5", "Course XYZ");
  });

  afterEach(() => {
    logoutAdmin();
  });
});

export {};