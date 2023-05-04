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

export const fillInCourseFormNew = (title: string, description: string, sections: sections) => {
  cy.get(courseTitle).type(title);
  cy.get(courseDescription).type(description);

  sections.forEach(({ title, video }, index) => {
    if (index > 0) {
      cy.get(".plus-icon").click();
    }

    cy.get(courseSection).eq(index).type(title);

    if (video) {
      cy.get("input[type=file]").eq(index).selectFile(video, { force: true });
      cy.wait(5000);
      cy.get(".video-js-edit").should("exist");
    }
  });

};

export const cancelAddingNewCourse = () => {
  cy.contains("button", "Cancel").click();
};
