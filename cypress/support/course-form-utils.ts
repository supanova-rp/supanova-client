import { adminCourseFormInputClassnames } from "./test-constants";

type section = {
  title: string,
  video?: string,
}

type sections = section[];

const { courseTitle, courseDescription, courseSection } = adminCourseFormInputClassnames;

export const checkCourseFormIsEmpty = () => {
  cy.get(courseTitle).should("have.value", "");
  cy.get(courseDescription).should("have.value", "");

  cy.get(courseSection).each(($el) => {
    cy.wrap($el).should("have.value", "");
  });

  cy.get(".video-js-edit").should("not.exist");
};

const fillInCourseTitleAndDescription = (title: string, description: string) => {
  cy.get(courseTitle).type(title);
  cy.get(courseDescription).type(description);
};

export const fillInCourseForm = (title: string, description: string, sections: sections) => {
  fillInCourseTitleAndDescription(title, description);

  sections.forEach(({ title, video }, index) => {
    cy.get(".plus-icon").click();
    cy.get(".remove-icon").eq(index).should("exist");

    cy.get(courseSection).eq(index).type(title);

    if (video) {
      cy.intercept("GET", "**/supanova-dev.s3**").as("getUploadUrl");
      cy.get("input[type=file]").eq(index).selectFile(video, { force: true });
      cy.get(".tick-upload-icon").should("exist");
      cy.get(".video-js-edit").eq(index).should("exist");
    }});
};

export const fillInCourseFormSaveBeforeVideoUploadCompleted = (title: string, description: string, sections: sections) => {
  fillInCourseTitleAndDescription(title, description);

  sections.forEach(({ title }, index) => {
    if (index === 0) {
      cy.get(".plus-icon").click();
    }

    cy.get(".remove-icon").eq(index).should("exist");
    cy.get(courseSection).eq(index).type(title);
  });

  cy.contains("button", "Save").click();
  cy.findByText("Please make sure videos are uploaded for every section.").should("exist");

  cy.get("input[type=file]").eq(0).selectFile(sections[0].video, { force: true });
  cy.get(".tick-upload-icon").should("exist");
  cy.get(".video-js-edit").eq(0).should("exist");

};

export const checkCourseExistsinEditCourses = () => {
  cy.get(".tab-2").click();
  cy.get("h5").eq(0).should("have.text", "Course A");
};

export const cancelAddingNewCourse = () => {
  cy.contains("button", "Cancel").click();
};

export const deleteCourse = () => {
  cy.get("h5").eq(0).click();
  cy.contains("button", "Delete").click();
  cy.contains("button", "Confirm").click();
};

export const checkCourseIsDeleted = (element: string, title: string) => {
  cy.wait(1000);
  cy.contains(element, title).should("not.exist");
};
