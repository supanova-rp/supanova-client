import { Component } from "react";

import { Course } from "../../../types/index";
import {
  getDeletedSectionsIds,
  getSectionsWithPositions
} from "../../../utils/utils";

import CourseErrorLoadingHandler from "../../CourseErrorLoadingHandler";
import CourseForm from "../course-form/CourseForm";
import RequestWrapper from "../../RequestWrapper";
import AdminHeader from "../AdminHeader";
import CoursesList from "./CoursesList";

type EditCoursesState = {
  isLoading: boolean,
  successMessage: null | string,
  getCoursesErrorMessage: null | string,
  allCourses: [] | Course[],
  editingCourseId: null | number,
}

export default class EditCourses extends Component {
  state: EditCoursesState = {
    isLoading: true,
    editingCourseId: null,
    successMessage: null,
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

  handleSuccessMessageTimeout = () => {
    setTimeout(() => {
      this.setState({ successMessage: null });
    }, 3000);
  };

  onCourseEditedSuccess = (editedCourse: Course,) => {
    const { allCourses, editingCourseId } = this.state;

    const updatedCoursesWithEditedCourse = allCourses.map((course) => {
      if (course.id === editingCourseId) {
        return editedCourse;
      }

      return course;
    });

    this.setState({
      successMessage: "Successfully saved edited course!",
      editingCourseId: null,
      allCourses: updatedCoursesWithEditedCourse,
    });

  };

  onCourseDeletedSuccess = (courseId: number) => {
    const coursesWithoutDeletedCourse = this.state.allCourses.filter((course) => course.id !== courseId);

    this.setState({
      allCourses: coursesWithoutDeletedCourse,
      editingCourseId: null,
      successMessage: "Successfully deleted course!"
    });

  };

  getRequestBody = (course: Course, initialCourse: Course,) => {
    return {
      edited_course_id: course.id,
      edited_course: {
        ...course,
        sections: getSectionsWithPositions(course)
      },
      deleted_sections_ids: getDeletedSectionsIds(course, initialCourse),
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
      successMessage,
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
              <CourseErrorLoadingHandler
                isLoading={isLoading}
                error={getCoursesErrorMessage}
                courses={allCourses}
                onClick={requestCourses}>

                {editingCourse
                  ? (
                    <CourseForm
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
                      successMessage={successMessage}
                      onClickEditCourse={this.onClickEditCourse}/>
                  )
                }
              </CourseErrorLoadingHandler>
            );
          }}/>
      </>
    );
  }
}