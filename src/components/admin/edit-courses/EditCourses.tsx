import { Component } from "react";

import { Course } from "../../../types/index";
import {
  getDeletedSectionsIds,
  getSectionsWithPositions,
} from "../course-form/utils";
import { REACT_TOAST_DURATION, feedbackMessages } from "src/constants/constants";

import RequestHandler from "../../RequestHandler";
import RequestWrapper from "../../RequestWrapper";
import AdminHeader from "../AdminHeader";
import CoursesList from "./CoursesList";
import CourseFormContainer from "../course-form/CourseFormContainer";
import toast from "react-hot-toast";

type EditCoursesState = {
  isLoading: boolean,
  getCoursesErrorMessage: null | string,
  allCourses: [] | Course[],
  editingCourseId: null | number,
}

export default class EditCourses extends Component {
  state: EditCoursesState = {
    isLoading: true,
    editingCourseId: null,
    getCoursesErrorMessage: null,
    allCourses: [],
  };

  onBeginRequestCourses = () => {
    this.setState({ isLoading: true, getCoursesErrorMessage: null });
  };

  onClickEditCourse = (courseId: number) => {
    this.setState({ editingCourseId: courseId });
  };

  onEditCourseCancelled = () => {
    this.setState({ editingCourseId: null });
  };

  onCourseEditedSuccess = (editedCourse: Course) => {
    const { allCourses, editingCourseId } = this.state;

    const updatedCoursesWithEditedCourse = allCourses.map((course) => {
      if (course.id === editingCourseId) {
        return editedCourse;
      }

      return course;
    });

    this.setState({
      editingCourseId: null,
      allCourses: updatedCoursesWithEditedCourse,
    });

    toast.success(feedbackMessages.saveCourseSuccess, REACT_TOAST_DURATION);
  };

  onCourseDeletedSuccess = (courseId: number) => {
    const coursesWithoutDeletedCourse = this.state.allCourses.filter((course) => course.id !== courseId);

    this.setState({
      allCourses: coursesWithoutDeletedCourse,
      editingCourseId: null,
    });

    toast.success(feedbackMessages.deleteCourseSuccess, REACT_TOAST_DURATION);
  };

  getRequestBody = (course: Course, initialCourse: Course,) => {
    return {
      edited_course_id: course.id,
      edited_course: {
        ...course,
        sections: getSectionsWithPositions(course)
      },
      deleted_section_ids_map: getDeletedSectionsIds(course, initialCourse),
    };
  };

  onSuccess = (result: Course[]) => {
    this.setState({
      allCourses: result,
      isLoading: false
    });
  };

  onError = (getCoursesErrorMessage: string, error = "") => {
    console.log(">>> error: ", error || getCoursesErrorMessage);

    this.setState({
      getCoursesErrorMessage,
      isLoading: false,
    });
  };

  render() {
    const {
      isLoading,
      allCourses,
      editingCourseId,
      getCoursesErrorMessage,
    } = this.state;

    const editingCourse = allCourses.find((course) => course.id === editingCourseId);

    return (
      <>
        <AdminHeader title="Edit Courses" />
        <RequestWrapper
          endpoint="/courses"
          requestOnMount
          onRequestBegin={this.onBeginRequestCourses}
          onError={(error: string) => this.onError("Failed to load courses.", error)}
          onSuccess={this.onSuccess}
          render={(requestCourses) => {
            return (
              <RequestHandler
                isLoading={isLoading}
                error={getCoursesErrorMessage}
                shouldShowWarning={!allCourses?.length}
                warningMessage="You don't have any courses yet..."
                onClick={requestCourses}>

                {editingCourse
                  ? (
                    <CourseFormContainer
                      initialCourse={editingCourse}
                      isEditing
                      saveFormEndpoint="/edit-course"
                      getRequestBody={this.getRequestBody}
                      onCourseSavedSuccess={this.onCourseEditedSuccess}
                      onCourseFormCancelled={this.onEditCourseCancelled}
                      onCourseDeletedSuccess={this.onCourseDeletedSuccess} />
                  )
                  : (
                    <CoursesList
                      courses={allCourses}
                      onClickEditCourse={this.onClickEditCourse}/>
                  )
                }
              </RequestHandler>
            );
          }}/>
      </>
    );
  }
}