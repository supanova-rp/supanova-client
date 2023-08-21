import { login } from "../support/auth-utils";
import { checkCourseSectionTitles,
  checkCourseSectionTitlesCancellation,
  editFirstCourse,
  resetFirstCourse
} from "../support/course-form-utils";
import { adminLinkClassname,
  initialDefaultCourse,
  adminCoursesListClassnames
} from "../support/test-constants";

const { title } = initialDefaultCourse;

const { courseListTitleElement } = adminCoursesListClassnames;

describe("Edit a course", () => {
  beforeEach(() => {
    login();
    cy.get(adminLinkClassname).click();
    cy.contains("button", "Edit Courses").click();
  });

  it("cancels editing a course", () => {
    editFirstCourse("Course A", "Section A");
    cy.contains("button", "Cancel").click();

    cy.get(courseListTitleElement).eq(0).invoke("text").should("eq", title);

    checkCourseSectionTitlesCancellation();
  });

  it("edits a course", () => {
    editFirstCourse("Course A", "Section A");
    cy.contains("button", "Save").click();

    cy.get(".edit-success-message").should("exist");
    cy.get(courseListTitleElement).eq(0).invoke("text").should("eq", "Course A");
    checkCourseSectionTitles("Section A");

    resetFirstCourse();
  });
});