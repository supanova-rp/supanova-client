import { Component } from "react";
import { Form } from "react-bootstrap";
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";

import {
  Course,
  CourseQuizQuestionServer,
  ErrorOptions,
  FormSubmitEvent,
  RequestBody,
  saveFormEndpoint
} from "src/types";
import {
  everyQuizQuestionHasCorrectAnswer,
  everyVideoSectionHasVideo,
  getQuizSections,
  getVideoSections,
  isVideoUploadInProgress
} from "./utils";
import { feedbackMessages, REACT_TOAST_DURATION } from "src/constants/constants";
import { ReactComponent as WarningIcon } from "../../../icons/warningIcon.svg";
import { colors } from "src/constants/colorPalette";

import CourseForm from "./CourseForm";
import DeleteCourseModal from "src/components/modals/DeleteCourseModal";
import RequestWrapper from "src/components/RequestWrapper";

type CourseFormContainerState = {
  course: Course,
  initialCourse: Course,
  isLoading: boolean,
  areActionsDisabled: boolean,
  isDeleteModalVisible: boolean,
}

interface CourseFormContainerProps {
  initialCourse: Course,
  isEditing: boolean,
  saveFormEndpoint: saveFormEndpoint,
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
    isLoading: this.props.isEditing,
    isDeleteModalVisible: false,
    initialCourse: this.props.initialCourse,
    course: this.props.initialCourse,
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

  onRequestQuizQuestionsBegin = () => {
    this.setState({
      areActionsDisabled: true,
      isLoading: true,
    });
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

    const { course, initialCourse } = this.state;
    const { getRequestBody } = this.props;

    if (!isVideoUploadInProgress(course) && everyVideoSectionHasVideo(getVideoSections(course)) && everyQuizQuestionHasCorrectAnswer(getQuizSections(course))) {
      const requestBody = getRequestBody(course, initialCourse);

      requestSaveCourse(requestBody);
    } else if (isVideoUploadInProgress(course) || !everyVideoSectionHasVideo(getVideoSections(course))) {
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

  onGetQuizQuestionsSuccess = (quizQuestions: CourseQuizQuestionServer[]) => {
    const updatedSectionsWithQuizQuestions = this.state.course.sections.map((section) => {
      if (section.videoUrl) {
        return section;
      }

      return {
        ...section,
        questions: quizQuestions.filter(question => question.quizSectionId === section.id)
      };
    });

    const updatedCourse = {
      ...this.state.course,
      sections: updatedSectionsWithQuizQuestions
    };

    this.setState({
      areActionsDisabled: false,
      isLoading: false,
      course: updatedCourse,
      initialCourse: updatedCourse,
    });
  };

  onGetQuizQuestionsError = () => {
    this.onError({
      type: "danger",
      message: feedbackMessages.getEditCourseError,
    });
  };

  onSaveCourseSuccess = (savedCourse: Course) => {
    this.setState({
      areActionsDisabled: false,
    });

    this.props.onCourseSavedSuccess(savedCourse);
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
      isLoading: false,
    });

    if (type === "danger") {
      toast.error(message, REACT_TOAST_DURATION);
    } else {
      toast(message, {
        icon: <WarningIcon
          height="22px"
          width="22px" />,
        ...REACT_TOAST_DURATION
      });
    }
  };

  render() {
    const {
      course,
      areActionsDisabled,
      isLoading,
      isDeleteModalVisible,
    } = this.state;

    const { onCourseFormCancelled, isEditing, saveFormEndpoint } = this.props;
    const quizSections = getQuizSections(course);
    const videoSections = getVideoSections(course);

    if (course) {
      return (
        <RequestWrapper
          requestOnMount
          skip={!isEditing && !quizSections.length}
          endpoint="/quiz-questions"
          onError={this.onGetQuizQuestionsError}
          onRequestBegin={this.onRequestQuizQuestionsBegin}
          onSuccess={this.onGetQuizQuestionsSuccess}
          requestBody={{ quizSectionIds: quizSections?.map((quizSection) => quizSection.id) }}
          render={() => {
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
                        if (isLoading) {
                          return (
                            <div className="full-screen-loading-container">
                              <PulseLoader
                                color={colors.orange}
                                className="m-5" />
                            </div>
                          );
                        }

                        return (
                          <>
                            <Form onSubmit={(e) => this.onClickSave(e, requestSaveCourse)}>
                              <CourseForm
                                course={course}
                                videoSections={videoSections}
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
          }}/>
      );
    }

    return null;
  }
};
