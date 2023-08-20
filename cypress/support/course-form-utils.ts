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

const getInitialCourseTitleAndSectionTitle = () => {
  const firstInitialCourse = cy.get(".courses-list-course-title").eq(0);
  const firstInitialCourseTitle = firstInitialCourse.invoke("text");
  const firstInitialSection = cy.get(".courses-list-section-title").eq(0);
  const firstInitialSectionTitle = firstInitialSection.invoke("text");

  cy.get(".courses-list-section-title").eq(0).then((theElement) => {
    const text = theElement.text();

    console.log(">>> text: ", text);
    cy.log(text);
  });

  // const text = await new Cypress.Promise<string>((resolve) => {
  //   cy.get('[data-testid="target"')
  //     .invoke('text')
  //     .then((txt) => resolve(txt.toString()))
  // })

  const initialCourseAndSectionTitles = {
    firstInitialCourse,
    firstInitialCourseTitle,
    firstInitialSection,
    firstInitialSectionTitle,
  };

  return initialCourseAndSectionTitles;
};

export const editFirstCourse = () => {
  const initialCourseAndSectionTitles = getInitialCourseTitleAndSectionTitle();

  cy.get(".courses-list-container").eq(0).click();

  cy.get(courseTitle).clear().type("Course A");
  cy.get(courseSection).eq(0).clear().type("Section A");

  console.log(">>> edited course!");

  return initialCourseAndSectionTitles;
};

const compareCourseTitleAndSectionCancellation = (
  firstInitialCourse: JQuery<HTMLElement>,
  firstInitialCourseTitle: JQuery<HTMLElement>,
  firstInitialSection: JQuery<HTMLElement>,
  firstInitialSectionTitle: JQuery<HTMLElement>
) => {
  expect(firstInitialCourse).to.equal(firstInitialCourseTitle);
  expect (firstInitialSection).to.equal(firstInitialSectionTitle);
};

const compareCourseTitleAndSectionSaving = (
  firstInitialCourse:JQuery<HTMLElement>,
  firstInitialCourseTitle: JQuery<HTMLElement>,
  firstInitialSection: JQuery<HTMLElement>,
  firstInitialSectionTitle: JQuery<HTMLElement>
) => {
  expect(firstInitialCourse === firstInitialCourseTitle).to.equal(false);
  expect(firstInitialSection === firstInitialSectionTitle).to.equal(false);
};

export const compareCourseTitlesAndSections = (courseAndSectionTitles: any, type: string) => {
  const {
    firstInitialCourse,
    firstInitialCourseTitle,
    firstInitialSection,
    firstInitialSectionTitle,
  } = courseAndSectionTitles;

  if (type === "cancellation") {
    compareCourseTitleAndSectionCancellation(
      firstInitialCourse,
      firstInitialCourseTitle,
      firstInitialSection,
      firstInitialSectionTitle);
  } else {
    compareCourseTitleAndSectionSaving(
      firstInitialCourse,
      firstInitialCourseTitle,
      firstInitialSection,
      firstInitialSectionTitle);
  }
};