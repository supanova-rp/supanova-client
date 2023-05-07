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
  isVideoUploadInProgress,
  everySectionHasVideo,
  getUpdatedCourse,
  request,
} from "src/utils/utils";

import CourseFormBody from "./CourseFormBody";
import DeleteCourseModal from "src/components/modals/DeleteCourseModal";
import { AuthContext, AuthContextType } from "src/contexts/AuthContext";

type CourseFormState = {
  course: Course,
  error: ErrorOptions,
  areActionsDisabled: boolean,
  isDeleteModalVisible: boolean,
}

interface CourseFormProps {
  initialCourse: Course,
  isEditing?: boolean,
  getRequestOptions: (course: Course, initialCourse: Course) => RequestOptions,
  onCourseSavedSuccess: (editedCourse: Course) => void,
  onCourseFormCancelled: () => void,
  onCourseDeletedSuccess?: (courseId: number) => void,
}

export default class CourseForm extends Component <CourseFormProps> {
  context: AuthContextType;

  state: CourseFormState = {
    error: {
      type: null,
      message: null,
    },
    areActionsDisabled: false,
    isDeleteModalVisible: false,
    course: this.props.initialCourse,
  };

  static contextType = AuthContext;

  onChangeCourseField = (key: string, newInputValue: string) => {
    this.setState({
      course: {
        ...this.state.course,
        [key]: newInputValue,
      }
    });
  };

  onFileUploadCancelled = (sectionId: number) => {
    this.setState({
      course: getUpdatedCourse(this.state.course, sectionId, "uploadProgress", null)
    });
  };

  onFileUploaded = (sectionId: number, videoUrl: string) => {
    this.setState({
      course: getUpdatedCourse(this.state.course, sectionId, "videoUrl", videoUrl)
    });
  };

  onFileUploadProgress = (data: AxiosProgressEvent, sectionId: number) => {
    this.setState({
      course: getUpdatedCourse(this.state.course, sectionId, "uploadProgress", data.progress)
    });
  };

  onChangeSectionTitle = (sectionId: number, value: string) => {
    this.setState({
      course: getUpdatedCourse(this.state.course, sectionId, "title", value)
    });
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

  handleRemoveSection = (sectionId: number) => {
    const { course } = this.state;

    const updatedSectionsMinusRemovedSection = course.sections.filter((section) => sectionId !== section.id);

    this.setState({
      course: {
        ...course,
        sections: updatedSectionsMinusRemovedSection,
      }
    });
  };

  onShowDeleteModal = () => {
    this.setState({ isDeleteModalVisible: true });
  };

  onHideDeleteModal = () => {
    this.setState({ isDeleteModalVisible: false });
  };

  onClickDelete = async () => {
    this.setState({
      areActionsDisabled: true,
      error: {
        type: null,
        message: null,
      },
    });

    const requestBody = {
      course_id: this.state.course.id,
    };

    request({
      endpoint: "/delete-course",
      method: "DELETE",
      requestBody,
      onSuccess: this.onSuccessfullyDeletedCourse,
      onError: this.onDeleteCourseError,
      onUnauthorised: this.onUnauthorised,
    });
  };

  onSuccessfullyDeletedCourse = () => {
    const { course } = this.state;
    const { onCourseDeletedSuccess } = this.props;

    if (onCourseDeletedSuccess) {
      onCourseDeletedSuccess(course.id);
    }
  };

  onDeleteCourseError = (error: string) => {
    this.setState({
      isDeleteModalVisible: false,
    });

    this.onError({
      type: "danger",
      message: "Failed to delete course. Try again.",
      error,
    });
  };

  onClickSave = async (event: FormSubmitEvent) => {
    event.preventDefault();

    const { course } = this.state;
    const { initialCourse, getRequestOptions } = this.props;

    if (!isVideoUploadInProgress(course) && everySectionHasVideo(course)) {
      this.setState({
        areActionsDisabled: true,
        error: {
          type: null,
          message: null,
        },
      });

      const requestOptions = getRequestOptions(course, initialCourse);

      request({
        endpoint: `${requestOptions.endpoint}`,
        method: `${requestOptions.method}`,
        requestBody: requestOptions.requestBody,
        onSuccess: () => this.onSuccessfullySavedCourse(),
        onError: (error: string) => this.onError({
          type: "danger",
          message: "Failed to save course. Try again.",
          error,
        }),
        onUnauthorised: this.onUnauthorised,
      });
    } else {
      this.onError({
        type: "warning",
        message: "Please make sure videos are uploaded for every section.",
      });
    }
  };

  onSuccessfullySavedCourse = () => {
    this.setState({
      areActionsDisabled: false,
    });

    this.props.onCourseSavedSuccess(this.state.course);
  };

  onUnauthorised = () => {
    this.context.logout();
  };

  onError = (errorOptions: ErrorOptions) => {
    console.log(">>> error: ", errorOptions.error || errorOptions.message);

    this.setState({
      areActionsDisabled: false,
      error: errorOptions,
    });
  };

  render() {
    const {
      course,
      error,
      areActionsDisabled,
      isDeleteModalVisible,
    } = this.state;

    const { onCourseFormCancelled, isEditing } = this.props;

    if (course) {
      return (
        <>
          <Form onSubmit={(e) => this.onClickSave(e)}>
            {error.message
              ? (
                <Alert
                  variant={error.type || "danger"}
                  className="course-form-error-alert">
                  {error.message}
                </Alert>
              )
              : null
            }

            <CourseFormBody
              course={course}
              isEditing={isEditing || false}
              areActionsDisabled={areActionsDisabled}
              onChangeCourseField={this.onChangeCourseField}
              onChangeSectionTitle={this.onChangeSectionTitle}
              onFileUploaded={this.onFileUploaded}
              onFileUploadProgress={this.onFileUploadProgress}
              onFileUploadCancelled={this.onFileUploadCancelled}
              handleRemoveSection={this.handleRemoveSection}
              onClickAddNewSection={this.onClickAddNewSection}
              onShowDeleteModal={this.onShowDeleteModal}
              onCourseFormCancelled={onCourseFormCancelled} />
          </Form>

          {isDeleteModalVisible
            ? (
              <DeleteCourseModal
                areActionsDisabled={areActionsDisabled}
                onHideDeleteModal={this.onHideDeleteModal}
                onClickDelete={this.onClickDelete} />
            )
            : null
          }
        </>
      );
    }

    return null;
  }
};