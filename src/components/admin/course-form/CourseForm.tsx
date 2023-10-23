import { Component } from "react";
import { Alert, Form } from "react-bootstrap";
import { AxiosProgressEvent } from "axios";

import {
  Course,
  ErrorOptions,
  FormSubmitEvent,
  RequestBody
} from "src/types";
import {
  isVideoUploadInProgress,
  everySectionHasVideo,
  getUpdatedCourse,
} from "src/utils/utils";

import DeleteCourseModal from "src/components/modals/DeleteCourseModal";
import RequestWrapper from "src/components/RequestWrapper";
import CourseFormBody from "./CourseFormBody";

type CourseFormState = {
  course: Course,
  error: ErrorOptions,
  areActionsDisabled: boolean,
  isDeleteModalVisible: boolean,
}

interface CourseFormProps {
  initialCourse: Course,
  isEditing: boolean,
  saveFormEndpoint: string,
  getRequestBody: (course: Course, initialCourse: Course) => RequestBody,
  onCourseSavedSuccess: (editedCourse: Course) => void,
  onCourseFormCancelled: () => void,
  onCourseDeletedSuccess: (courseId: number) => void,
}

export default class CourseForm extends Component <CourseFormProps> {
  static defaultProps = {
    isEditing: false,
    onCourseDeletedSuccess: () => {}
  };

  state: CourseFormState = {
    error: {
      type: null,
      message: null,
    },
    areActionsDisabled: false,
    isDeleteModalVisible: false,
    course: this.props.initialCourse,
  };

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

    const updatedSections = course.sections.filter((section) => sectionId !== section.id);

    this.setState({
      course: {
        ...course,
        sections: updatedSections,
      }
    });
  };

  onShowDeleteModal = () => {
    this.setState({ isDeleteModalVisible: true });
  };

  onHideDeleteModal = () => {
    this.setState({ isDeleteModalVisible: false });
  };

  onRequestBegin = () => {
    this.setState({
      areActionsDisabled: true,
      error: {
        type: null,
        message: null,
      },
    });
  };

  onClickDelete = async (requestDeleteCourse: any) => {
    const { course: { id: courseId } } = this.state;

    requestDeleteCourse({ course_id: courseId });
  };

  onDeleteCourseSuccess = () => {
    const { course: { id: courseId } } = this.state;

    this.props.onCourseDeletedSuccess(courseId);
  };

  onDeleteCourseError = (error: string) => {
    this.setState({
      isDeleteModalVisible: false,
    });

    this.onError({
      type: "danger",
      message: "Failed to delete course.",
      error,
    });
  };

  onClickSave = async (event: FormSubmitEvent, requestSaveCourse: any) => {
    event.preventDefault();

    const { course } = this.state;
    const { initialCourse, getRequestBody } = this.props;

    if (!isVideoUploadInProgress(course) && everySectionHasVideo(course)) {
      const requestBody = getRequestBody(course, initialCourse);

      requestSaveCourse(requestBody);
    } else {
      this.onError({
        type: "warning",
        message: "WARNING! Please make sure videos are uploaded for every section.",
      });
    }
  };

  onSaveCourseSuccess = () => {
    this.setState({
      areActionsDisabled: false,
    });

    this.props.onCourseSavedSuccess(this.state.course);
  };

  onSaveCourseError = (error: string) => {
    this.onError({
      type: "danger",
      message: "Failed to load courses.",
      error,
    });
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

    const { onCourseFormCancelled, isEditing, saveFormEndpoint } = this.props;

    if (course) {
      return (
        <RequestWrapper
          endpoint={saveFormEndpoint}
          onRequestBegin={this.onRequestBegin}
          onError={this.onSaveCourseError}
          onSuccess={this.onSaveCourseSuccess}
          render={(requestSaveCourse) => {
            return (
              <RequestWrapper
                endpoint="/delete-course"
                onRequestBegin={this.onRequestBegin}
                onError={this.onDeleteCourseError}
                onSuccess={this.onDeleteCourseSuccess}
                render={(requestDeleteCourse) => {
                  return (
                    <>
                      <Form onSubmit={(e) => this.onClickSave(e, requestSaveCourse)}>
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
                          isEditing={isEditing}
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
                            onClickDelete={() => this.onClickDelete(requestDeleteCourse)} />
                        )
                        : null
                      }
                    </>
                  );
                }} />
            );
          }}/>

      );
    }

    return null;
  }
};
