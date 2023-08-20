import { login } from "../support/auth-utils";
import { compareCourseTitlesAndSections, editFirstCourse } from "../support/course-form-utils";
import { adminLinkClassname } from "../support/test-constants";

describe("Edit a course", () => {
  beforeEach(() => {
    login();
    cy.get(adminLinkClassname).click();
    cy.contains("button", "Edit Courses").click();
  });

  it("cancels editing a course", () => {
    // Make it so your initial title is always Radiation Basics
    // With 2 sections intro and outro
    // Delete 1 section
    // Check if both sections are still there
    const initialCourseAndSectionTitles = editFirstCourse();

    cy.contains("button", "Cancel").click();

    compareCourseTitlesAndSections(initialCourseAndSectionTitles, "cancellation");
  });

  it.only("edits a course", () => {
    // Make it so your initial title is always Radiation Basics
    // And intro as your section
    // Remove the last section
    // Now you should only have 1
    const initialCourseAndSectionTitles = editFirstCourse();

    console.log(">>> initialCourseAndSectionTitles: ", initialCourseAndSectionTitles);

    cy.contains("button", "Save").click();

    compareCourseTitlesAndSections(initialCourseAndSectionTitles, "saving");

    // go back into the course
    // Put it back to radiation basics and
    // Have 2 sections again: intro and outro
    // Save
  });
});