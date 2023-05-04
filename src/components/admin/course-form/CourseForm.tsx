import { Component } from "react";
import { Alert, Form } from "react-bootstrap";
import { AxiosProgressEvent } from "axios";

import {
  Course,
  ErrorOptions,
  FormSubmitEvent,
  RequestOptions
} from "src/types";
import {
  areSomeVideosCurrentlyUploading,
  doesEverySectionHaveAVideoUrl,
  getUpdatedCourse,
  request,
} from "src/utils/utils";

import CourseFormBody from "./CourseFormBody";
import DeleteCourseOverlay from "src/components/overlays/DeleteCourseOverlay";
import { AuthContext, AuthContextType } from "src/contexts/AuthContext";

type CourseFormState = {
  course: Course,
  error: ErrorOptions,
  areActionsDisabled: boolean,
  courseIdToDelete: null | number,
  deleteCourseErrorMessage: null | string,
}

interface CourseFormProps {
  initialCourse: Course,
  isEditing?: boolean,
  getRequestOptions: (course: Course, initialCourse: Course) => RequestOptions,
  onCourseSavedSuccess: (editedCourse: Course) => void,
  onCourseFormCancelled: (editingCourseId: number | null) => void,
  onCourseDeletedSuccess?: (courseIdToDelete: number) => void,
}

export default class CourseForm extends Component <CourseFormProps> {
  context: AuthContextType;

  state: CourseFormState = {
    error: {
      message: null,
      type: null,
      error: null,
    },
    areActionsDisabled: false,
    courseIdToDelete: null,
    deleteCourseErrorMessage: null,
    course: this.props.initialCourse,
  };

  static contextType = AuthContext;

  onUpdateStateAfterCancellingFileUpload = (sectionId: number) => {
    const { course } = this.state;

    const courseWithResetVideoUploadProgress = getUpdatedCourse(course, sectionId, "uploadProgress", null);

    this.setState({ course: courseWithResetVideoUploadProgress });
  };

  onFileUploaded = (sectionId: number, videoUrl: string) => {
    const { course } = this.state;

    const courseWithUpdatedVideoUrl = getUpdatedCourse(course, sectionId, "videoUrl", videoUrl);

    this.setState({ course: courseWithUpdatedVideoUrl });
  };

  onFileUploadProgress = (data: AxiosProgressEvent, sectionId: number) => {
    const { course } = this.state;

    const courseWithUpdatedVideoUploadProgress = getUpdatedCourse(course, sectionId, "uploadProgress", data.progress);

    this.setState({ course: courseWithUpdatedVideoUploadProgress });
  };

  onClickAddNewSection = () => {
    const { course } = this.state;

    const updatedCourseWithNewSection = {
      ...course,
      sections: [
        ...course.sections,
        {
          id: Date.now(),
          title: "",
          videoUrl: "",
          isNewSection: this.props.isEditing,
        },
      ],
    };

    this.setState({ course: updatedCourseWithNewSection });
  };

  onChangeCourseField = (key: string, newInputValue: string) => {
    const { course } = this.state;

    const updatedCourse = {
      ...course,
      [key]: newInputValue,
    };

    this.setState({ course: updatedCourse });
  };

  onChangeSectionTitle = (sectionId: number, newInputValue: string) => {
    const { course } = this.state;

    const sectionsWithUpdatedSectionTitle = course.sections.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          title: newInputValue,
        };
      }

      return section;
    });

    const updatedCourse = {
      ...course,
      sections: sectionsWithUpdatedSectionTitle,
    };

    this.setState({ course: updatedCourse });
  };

  handleRemoveSection = (sectionId: number) => {
    const { course } = this.state;

    const updatedSectionsMinusRemovedSection = course.sections.filter((section) => sectionId !== section.id);

    const updatedCourse = {
      ...course,
      sections: updatedSectionsMinusRemovedSection,
    };

    this.setState({ course: updatedCourse });
  };

  onClickHandleShowingDeleteOverlay = (value: number | null) => {
    this.setState({ courseIdToDelete: value, deleteCourseErrorMessage: null });
  };

  onUnauthorised = () => {
    this.context.logout();
  };

  onClickDeleteCourse = async () => {
    this.setState({
      areActionsDisabled: true,
      deleteCourseErrorMessage: null,
    });

    const requestBody = {
      course_id: this.state.courseIdToDelete,
    };

    request({
      endpoint: "/delete-course",
      method: "DELETE",
      requestBody,
      onSuccess: this.onSuccessfullyDeletedCourse,
      onError: (deleteCourseError: string) => this.onError({
        message: "Deleting course failed. Try again.",
        type: "danger",
        error: deleteCourseError
      }),
      onUnauthorised: this.onUnauthorised,
    });
  };

  onSuccessfullyDeletedCourse = () => {
    const { courseIdToDelete } = this.state;
    const { onCourseFormCancelled, onCourseDeletedSuccess } = this.props;

    onCourseFormCancelled(null);

    if (courseIdToDelete && onCourseDeletedSuccess) {
      onCourseDeletedSuccess(courseIdToDelete);
    }

    this.setState({
      areActionsDisabled: false,
      courseIdToDelete: null,
    });
  };

  onSuccessfullySavedCourse = () => {
    this.setState({
      areActionsDisabled: false,
    });

    this.props.onCourseSavedSuccess(this.state.course);
  };

  onClickSaveEditedCourse = async (event: FormSubmitEvent) => {
    event.preventDefault();

    const { course } = this.state;
    const { initialCourse, getRequestOptions } = this.props;

    if (!areSomeVideosCurrentlyUploading(course) && doesEverySectionHaveAVideoUrl(course)) {
      this.setState({
        areActionsDisabled: true,
        error: {
          message: null,
          type: null,
          error: null,
        },
      });

      const requestOptions = getRequestOptions(course, initialCourse);

      request({
        endpoint: `${requestOptions.endpoint}`,
        method: `${requestOptions.method}`,
        requestBody: requestOptions.requestBody,
        onSuccess: () => this.onSuccessfullySavedCourse(),
        onError: (saveCourseError: string) => this.onError({
          message: "Failed to save course. Try again.",
          type: "danger",
          error: saveCourseError,
        }),
        onUnauthorised: this.onUnauthorised,
      });
    } else {
      this.onError({
        message: "Please make sure videos are uploaded for every section.",
        type: "warning"
      });
    }
  };

  onError = (errorOptions: ErrorOptions) => {
    console.log(">>> error: ", errorOptions.error || errorOptions.message);

    this.setState({
      areActionsDisabled: false,
      error: {
        ...this.state.error,
        ...errorOptions,
      }
    });
  };

  render() {
    const {
      course,
      error,
      areActionsDisabled,
      courseIdToDelete,
      deleteCourseErrorMessage
    } = this.state;

    const { onCourseFormCancelled, isEditing } = this.props;

    const alertVariant = error.type === "warning" ? "warning" : "danger";

    if (course) {
      return (
        <>
          <Form onSubmit={(e) => this.onClickSaveEditedCourse(e)}>
            {error.message
              ? (
                <Alert
                  variant={alertVariant}
                  className="course-form-error-alert">
                  {error.message}
                </Alert>
              )
              : null
            }

            <div className="my-4">
              <CourseFormBody
                course={course}
                isEditing={isEditing || false}
                areActionsDisabled={areActionsDisabled}
                onChangeCourseField={this.onChangeCourseField}
                onChangeSectionTitle={this.onChangeSectionTitle}
                onFileUploaded={this.onFileUploaded}
                onFileUploadProgress={this.onFileUploadProgress}
                onUpdateStateAfterCancellingFileUpload={this.onUpdateStateAfterCancellingFileUpload}
                handleRemoveSection={this.handleRemoveSection}
                onClickAddNewSection={this.onClickAddNewSection}
                onClickHandleShowingDeleteOverlay={this.onClickHandleShowingDeleteOverlay}
                onCourseFormCancelled={onCourseFormCancelled} />
            </div>
          </Form>

          {courseIdToDelete
            ? (
              <DeleteCourseOverlay
                areActionsDisabled={areActionsDisabled}
                deleteCourseErrorMessage={deleteCourseErrorMessage}
                onClickHandleShowingDeleteOverlay={this.onClickHandleShowingDeleteOverlay}
                onClickDeleteCourse={this.onClickDeleteCourse} />
            )
            : null
          }
        </>
      );
    }

    return null;
  }
};