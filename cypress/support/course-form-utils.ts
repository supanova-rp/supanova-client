import {
  adminCourseFormInputClassnames,
  adminCoursesListClassnames,
  feedbackMessages,
  initialDefaultCourse }
  from "./test-constants";

type section = {
  title: string,
  video?: string,
}

type sections = section[];

const {
  courseTitleElement,
  courseDescriptionElement,
  courseSectionElement
} = adminCourseFormInputClassnames;

export const checkCourseFormIsEmpty = () => {
  cy.get(courseTitleElement).should("have.value", "");
  cy.get(courseDescriptionElement).should("have.value", "");

  cy.get(courseSectionElement).each(($el) => {
    cy.wrap($el).should("have.value", "");
  });

  cy.get(".video-admin").should("not.exist");
};

const fillInCourseTitleAndDescription = (title: string, description: string) => {
  cy.get(courseTitleElement).type(title);
  cy.get(courseDescriptionElement).type(description);
};

export const fillInCourseForm = (title: string, description: string, sections: sections) => {
  fillInCourseTitleAndDescription(title, description);

  sections.forEach(({ title, video }, index) => {
    cy.get(".plus-icon").click();
    cy.get(".remove-icon").eq(index).should("exist");

    cy.get(courseSectionElement).eq(index).type(title);

    if (video) {
      cy.intercept("GET", "**/supanova-dev.s3**").as("getUploadUrl");
      cy.get("input[type=file]").eq(index).selectFile(video, { force: true });
      cy.get(".tick-upload-icon").should("exist");
      cy.get(".video-admin").eq(index).should("exist");
    }});
};

export const fillInCourseFormSaveBeforeVideoUploadCompleted = (title: string, description: string, sections: sections) => {
  fillInCourseTitleAndDescription(title, description);

  sections.forEach(({ title }, index) => {
    if (index === 0) {
      cy.get(".plus-icon").click();
    }

    cy.get(".remove-icon").eq(index).should("exist");
    cy.get(courseSectionElement).eq(index).type(title);
  });

  cy.contains("button", "Save").click();
  cy.findByText(feedbackMessages.videoMissing).should("exist");

  cy.get("input[type=file]").eq(0).selectFile(sections[0].video, { force: true });
  cy.get(".tick-upload-icon").should("exist");
  cy.get(".video-admin").eq(0).should("exist");

};

export const checkCourseExistsinEditCourses = () => {
  cy.get(".tab-2").click();
  cy.get("h5").eq(0).should("have.text", "Course XYZ");
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

export const editFirstCourse = (courseTitle: string, sectionTitle: string, reset = false) => {
  cy.get(".courses-list-container").eq(0).click();

  cy.get(courseTitleElement).clear().type(courseTitle);
  cy.get(courseSectionElement).eq(0).clear().type(sectionTitle);

  if (reset) {
    cy.get(".remove-icon").eq(1).click();
  }
};

export const resetFirstCourse = () => {
  const { title, sections } = initialDefaultCourse;

  editFirstCourse(title, sections[0].title, true);
  cy.get(".plus-icon").click();
  cy.get(courseSectionElement).eq(1).clear().type(sections[1].title);
  cy.get("input[type=file]").eq(1).selectFile("cypress/short-test-video.mp4", { force: true });
  cy.wait(5000);
  cy.contains("button", "Save").click();
};

export const checkCourseSectionTitlesCancellation = () => {
  const { sections } = initialDefaultCourse;
  const { courseListSectionElement } = adminCoursesListClassnames;

  sections.forEach((section, index) => {
    cy.get(courseListSectionElement).eq(index).invoke("text").should("eq", section.title);
  });
};

export const checkCourseSectionTitles = (sectionTitle: string) => {
  const { sections } = initialDefaultCourse;
  const { courseListSectionElement } = adminCoursesListClassnames;

  sections.forEach((_, index) => {
    if (index === 0) {
      cy.get(courseListSectionElement).eq(0).invoke("text").should("eq", sectionTitle);
    } else {
      const secondDefaultSectionTitle = sections[1].title;

      cy.get(courseListSectionElement).eq(1).invoke("text").should("not.eq", secondDefaultSectionTitle);
    }
  });
};