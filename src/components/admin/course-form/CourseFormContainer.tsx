import { Component } from "react";
import { Form } from "react-bootstrap";
import toast from "react-hot-toast";

import {
  Course,
  ErrorOptions,
  FormSubmitEvent,
  RequestBody
} from "src/types";
import {
  everyQuizQuestionHasCorrectAnswer,
  everyVideoSectionHasVideo,
  isQuizSection,
  isVideoSection,
  isVideoUploadInProgress
} from "./utils";
import { feedbackMessages } from "src/constants/constants";
import { ReactComponent as WarningIcon } from "../../../icons/warningIcon.svg";

import CourseForm from "./CourseForm";
import DeleteCourseModal from "src/components/modals/DeleteCourseModal";
import RequestWrapper from "src/components/RequestWrapper";

type CourseFormContainerState = {
  course: Course,
  areActionsDisabled: boolean,
  isDeleteModalVisible: boolean,
}

interface CourseFormContainerProps {
  initialCourse: Course,
  isEditing: boolean,
  saveFormEndpoint: string,
  getRequestBody: (course: Course, initialCourse: Course) => RequestBody,
  onCourseSavedSuccess: (editedCourse: Course) => void,
  onCourseFormCancelled: () => void,
  onCourseDeletedSuccess: (courseId: number) => void,
}

export default class CourseFormContainer extends Component <CourseFormContainerProps> {
  static defaultProps = {
    isEditing: false,
    onCourseDeletedSuccess: () => {}
  };

  state: CourseFormContainerState = {
    areActionsDisabled: false,
    isDeleteModalVisible: false,
    course: this.props.initialCourse,
  };

  getVideoSections = () => {
    return this.state.course.sections.filter(isVideoSection);
  };

  getQuizSections = () => {
    return this.state.course.sections.filter(isQuizSection);
  };

  onUpdateCourse = (course: Course) => {
    this.setState({ course });
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
      message: feedbackMessages.deleteCourseError,
      error,
    });
  };

  onClickSave = async (event: FormSubmitEvent, requestSaveCourse: any) => {
    event.preventDefault();

    const { course } = this.state;
    const { initialCourse, getRequestBody } = this.props;

    if (!isVideoUploadInProgress(course) && everyVideoSectionHasVideo(this.getVideoSections()) && everyQuizQuestionHasCorrectAnswer(this.getQuizSections())) {
      const requestBody = getRequestBody(course, initialCourse);

      requestSaveCourse(requestBody);
    } else if (isVideoUploadInProgress(course) || !everyVideoSectionHasVideo(this.getVideoSections())) {
      this.onError({
        type: "warning",
        message: feedbackMessages.videoMissing,
      });
    } else {
      this.onError({
        type: "warning",
        message: feedbackMessages.correctAnswerMissing
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
      message: feedbackMessages.saveCourseError,
      error,
    });
  };

  onError = (errorOptions: ErrorOptions) => {
    const { message, error, type } = errorOptions;

    console.log(">>> error: ", error || message);

    this.setState({
      areActionsDisabled: false,
    });

    if (type === "danger") {
      toast.error(message);
    } else {
      toast(message, {
        icon: <WarningIcon
          height="22px"
          width="22px" /> });
    }
  };

  render() {
    const {
      course,
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
                        <CourseForm
                          course={course}
                          videoSections={this.getVideoSections()}
                          isEditing={isEditing}
                          areActionsDisabled={areActionsDisabled}
                          onUpdateCourse={this.onUpdateCourse}
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
