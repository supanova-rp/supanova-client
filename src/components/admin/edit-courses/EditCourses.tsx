import { Component } from "react";

import { Course } from "../../../types/index";
import {
  getDeletedSectionsIds,
  getRequest,
  getSectionsWithPositions
} from "../../../utils/utils";
import { AuthContext, AuthContextType } from "src/contexts/AuthContext";

import CourseErrorLoadingHandler from "src/components/CourseErrorLoadingHandler";
import CourseForm from "../course-form/CourseForm";
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
  context: AuthContextType;

  static contextType = AuthContext;

  getCourses = () => {
    this.setState({ isLoading: true, getCoursesErrorMessage: null });

    getRequest({
      endpoint: "/courses",
      onSuccess: this.onSuccess,
      onError: (error: string) => this.onError("Loading courses failed", error),
      onUnauthorised: this.onUnauthorised,
    });
  };

  componentDidMount () {
    this.getCourses();
  };

  onUnauthorised = () => {
    this.context.logout();
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

    this.handleSuccessMessageTimeout();
  };

  onCourseDeletedSuccess = (courseId: number) => {
    const coursesWithoutDeletedCourse = this.state.allCourses.filter((course) => course.id !== courseId);

    this.setState({
      allCourses: coursesWithoutDeletedCourse,
      editingCourseId: null,
      successMessage: "Successfully deleted course!"
    });

    this.handleSuccessMessageTimeout();
  };

  getRequestOptions = (course: Course, initialCourse: Course,) => {
    return {
      requestBody: {
        edited_course_id: course.id,
        edited_course: {
          ...course,
          sections: getSectionsWithPositions(course)
        },
        deleted_sections_ids: getDeletedSectionsIds(course, initialCourse),
      },
      method: "PUT",
      endpoint: "/edit-course"
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
      <CourseErrorLoadingHandler
        isLoading={isLoading}
        error={getCoursesErrorMessage}
        courses={allCourses}
        onClick={this.getCourses}>

        {editingCourse
          ? (
            <CourseForm
              initialCourse={editingCourse}
              isEditing
              getRequestOptions={this.getRequestOptions}
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
  }
}