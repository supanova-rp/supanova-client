import { AxiosProgressEvent } from "axios";
import { Component } from "react";
import uuid from "react-uuid";
import {
  Course,
  CourseMaterial,
  CourseQuizQuestion,
  CourseQuizSection,
  CourseSection,
  CourseVideoSection,
  ID,
  onChangeCourseFieldKey,
  SectionTypes,
} from "src/types";

import CourseFormBody from "./CourseFormBody";
import {
  getCourseWithNewSection,
  getInitialEmptyQuizQuestionAndAnswers,
  getCourseWithNewQuizQuestion,
  getUpdatedCourse,
  isVideoSection,
} from "./utils";

interface CourseFormProps {
  course: Course;
  isEditing: boolean;
  videoSections: CourseSection[];
  areActionsDisabled: boolean;
  onUpdateCourse: (course: Course) => void;
  onShowDeleteModal: () => void;
  onCourseFormCancelled: () => void;
}

export default class CourseForm extends Component<CourseFormProps> {
  onChangeCourseField = (
    key: onChangeCourseFieldKey,
    newInputValue: string,
  ) => {
    const { course, onUpdateCourse } = this.props;

    onUpdateCourse({
      ...course,
      [key]: newInputValue,
    });
  };

  onVideoFileUploadCancelled = (sectionId: ID) => {
    const { course, onUpdateCourse } = this.props;

    onUpdateCourse({
      ...course,
      sections: course.sections.map(section => {
        if (isVideoSection(section) && section.id === sectionId) {
          return {
            ...section,
            uploadProgress: null,
            uploaded: !!section.storageKey, // if there's already a storage key then a file has already been uploaded before
            storageKeyBeingUploaded: "",
          };
        }

        return section;
      }),
    });
  };

  onVideoFileUploaded = (sectionId: ID) => {
    const { course, onUpdateCourse } = this.props;

    onUpdateCourse({
      ...course,
      sections: course.sections.map(section => {
        if (isVideoSection(section) && section.id === sectionId) {
          return {
            ...section,
            uploadProgress: 1,
            uploaded: true,
            storageKey: section.storageKeyBeingUploaded || "",
            storageKeyBeingUploaded: "",
          };
        }

        return section;
      }),
    });
  };

  onVideoFileUploadProgress = (data: AxiosProgressEvent, sectionId: ID) => {
    const { course, onUpdateCourse } = this.props;

    onUpdateCourse(
      getUpdatedCourse(course, sectionId, "uploadProgress", data.progress),
    );
  };

  onCourseMaterialUploadCancelled = (id: ID) => {
    const { course, onUpdateCourse } = this.props;

    onUpdateCourse({
      ...course,
      materials: course.materials.map(material => {
        if (material.id === id) {
          return {
            ...material,
            uploadProgress: null,
            uploaded: !!material.storageKey, // if there's already a storage key then a file has already been uploaded before
            storageKeyBeingUploaded: "",
          };
        }

        return material;
      }),
    });
  };

  onCourseMaterialUploadProgress = (data: AxiosProgressEvent, id: ID) => {
    const { course, onUpdateCourse } = this.props;

    onUpdateCourse({
      ...course,
      materials: course.materials.map(material => {
        if (material.id === id) {
          return { ...material, uploadProgress: data.progress };
        }

        return material;
      }),
    });
  };

  onCourseMaterialUploaded = (id: ID) => {
    const { course, onUpdateCourse } = this.props;

    onUpdateCourse({
      ...course,
      materials: course.materials.map(material => {
        if (material.id === id) {
          return {
            ...material,
            uploadProgress: 1,
            uploaded: true,
            storageKey: material.storageKeyBeingUploaded || "",
            storageKeyBeingUploaded: "",
          };
        }

        return material;
      }),
    });
  };

  handleRemoveMaterial = (materialId: ID) => {
    const { course, onUpdateCourse } = this.props;

    onUpdateCourse({
      ...course,
      materials: course.materials.filter(m => m.id !== materialId),
    });
  };

  onChangeSectionTitle = (sectionId: ID, inputValue: string) => {
    const { course, onUpdateCourse } = this.props;

    onUpdateCourse(getUpdatedCourse(course, sectionId, "title", inputValue));
  };

  onChangeVideoStorageKey = (sectionId: ID, storageKey: string) => {
    const { course, onUpdateCourse } = this.props;

    onUpdateCourse({
      ...course,
      sections: course.sections.map(section => {
        if (isVideoSection(section) && section.id === sectionId) {
          return {
            ...section,
            storageKeyBeingUploaded: storageKey,
            uploaded: false,
          };
        }

        return section;
      }),
    });
  };

  onHandleUpdateQuiz = (
    quizId: ID,
    quizQuestionsAndAnswers: CourseQuizQuestion[],
  ) => {
    const { course, onUpdateCourse } = this.props;

    onUpdateCourse(
      getUpdatedCourse(course, quizId, "questions", quizQuestionsAndAnswers),
    );
  };

  onChangeMaterialStorageKey = (materialID: ID, storageKey: ID) => {
    const { course, onUpdateCourse } = this.props;

    onUpdateCourse({
      ...course,
      materials: course.materials.map(material => {
        if (material.id === materialID) {
          return {
            ...material,
            storageKeyBeingUploaded: storageKey,
            uploaded: false,
          };
        }

        return material;
      }),
    });
  };

  onChangeMaterialName = (materialId: ID, inputValue: string) => {
    const { course, onUpdateCourse } = this.props;

    onUpdateCourse({
      ...course,
      materials: course.materials.map(material => {
        if (material.id === materialId) {
          return {
            ...material,
            name: inputValue,
          };
        }

        return material;
      }),
    });
  };

  onClickAddCourseMaterial = () => {
    const { course, onUpdateCourse } = this.props;

    const courseMaterial: CourseMaterial = {
      id: uuid(),
      name: "",
      storageKey: "",
      storageKeyBeingUploaded: "",
      uploaded: false,
    };

    onUpdateCourse({
      ...course,
      materials: [...course.materials, courseMaterial],
    });
  };

  onClickAddNewVideoSection = () => {
    const { course, isEditing, onUpdateCourse } = this.props;

    const newSection: CourseVideoSection = {
      id: `${Date.now()}`,
      title: "",
      type: SectionTypes.Video,
      storageKey: "",
      storageKeyBeingUploaded: "",
      isNewSection: isEditing,
      uploaded: false,
    };

    const updatedCourseWithNewVideoSection = getCourseWithNewSection(
      course,
      newSection,
    );

    onUpdateCourse(updatedCourseWithNewVideoSection);
  };

  onClickAddNewQuizSection = () => {
    const { course, onUpdateCourse, isEditing } = this.props;

    const newQuizSection: CourseQuizSection = {
      id: `${Date.now()}`,
      type: SectionTypes.Quiz,
      questions: [getInitialEmptyQuizQuestionAndAnswers(isEditing)],
      isNewSection: isEditing,
    };

    const updatedCourseWithNewQuizSection = getCourseWithNewSection(
      course,
      newQuizSection,
    );

    onUpdateCourse(updatedCourseWithNewQuizSection);
  };

  onClickAddNewQuizQuestion = (quizId: ID) => {
    const { course, onUpdateCourse, isEditing } = this.props;

    const courseWithUpdatedQuiz = getCourseWithNewQuizQuestion(
      course,
      quizId,
      isEditing,
    );

    onUpdateCourse(courseWithUpdatedQuiz);
  };

  onHandleAddNewQuizAnswer = (
    quizId: ID,
    updatedQuizQuestions: CourseQuizQuestion[],
  ) => {
    const { course, onUpdateCourse } = this.props;

    const courseWithAddedQuizAnswer = getUpdatedCourse(
      course,
      quizId,
      "questions",
      updatedQuizQuestions,
    );

    onUpdateCourse(courseWithAddedQuizAnswer);
  };

  handleRemoveSection = (sectionId: ID) => {
    const { course, onUpdateCourse } = this.props;

    const updatedSections = course.sections.filter(
      section => sectionId !== section.id,
    );

    onUpdateCourse({
      ...course,
      sections: updatedSections,
    });
  };

  onClickRemoveQuizQuestion = (quizId: ID, questionId: string) => {
    const { course, onUpdateCourse } = this.props;

    const updatedSectionsMinusQuizQuestion = course.sections.map(section => {
      if (section.id === quizId && section.questions) {
        const updatedQuiz = section.questions.filter(
          question => question.id !== questionId,
        );

        return {
          ...section,
          questions: updatedQuiz,
        };
      }

      return section;
    });

    onUpdateCourse({
      ...course,
      sections: updatedSectionsMinusQuizQuestion,
    });
  };

  onMoveSection = (sectionId: ID, direction: "up" | "down") => {
    const { course, onUpdateCourse } = this.props;

    const currentIndex = course.sections.findIndex(s => s.id === sectionId);

    if (currentIndex === -1) {
      return;
    }

    const targetIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;

    const updatedSections = structuredClone(course.sections);
    const currentSection = updatedSections[currentIndex];

    updatedSections[currentIndex] = updatedSections[targetIndex];
    updatedSections[targetIndex] = currentSection;

    onUpdateCourse({
      ...course,
      sections: updatedSections,
    });
  };

  render() {
    const {
      course,
      videoSections,
      onCourseFormCancelled,
      isEditing,
      areActionsDisabled,
      onShowDeleteModal,
    } = this.props;

    return (
      <CourseFormBody
        course={course}
        videoSections={videoSections}
        isEditing={isEditing}
        areActionsDisabled={areActionsDisabled}
        onChangeCourseField={this.onChangeCourseField}
        onChangeSectionTitle={this.onChangeSectionTitle}
        onHandleUpdateQuiz={this.onHandleUpdateQuiz}
        onVideoFileUploaded={this.onVideoFileUploaded}
        onVideoFileUploadProgress={this.onVideoFileUploadProgress}
        onVideoFileUploadCancelled={this.onVideoFileUploadCancelled}
        onChangeVideoStorageKey={this.onChangeVideoStorageKey}
        handleRemoveSection={this.handleRemoveSection}
        onCourseMaterialUploaded={this.onCourseMaterialUploaded}
        onCourseMaterialUploadCancelled={this.onCourseMaterialUploadCancelled}
        onCourseMaterialUploadProgress={this.onCourseMaterialUploadProgress}
        onChangeMaterialStorageKey={this.onChangeMaterialStorageKey}
        handleRemoveMaterial={this.handleRemoveMaterial}
        onMoveSection={this.onMoveSection}
        onChangeMaterialName={this.onChangeMaterialName}
        onClickAddCourseMaterial={this.onClickAddCourseMaterial}
        onClickAddNewVideoSection={this.onClickAddNewVideoSection}
        onClickAddNewQuizSection={this.onClickAddNewQuizSection}
        onClickAddNewQuizQuestion={this.onClickAddNewQuizQuestion}
        onHandleAddNewQuizAnswer={this.onHandleAddNewQuizAnswer}
        onClickRemoveQuizQuestion={this.onClickRemoveQuizQuestion}
        onShowDeleteModal={onShowDeleteModal}
        onCourseFormCancelled={onCourseFormCancelled}
      />
    );
  }
}
