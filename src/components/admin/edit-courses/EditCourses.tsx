import { Component } from "react";
import toast from "react-hot-toast";
import {
  REACT_TOAST_DURATION,
  feedbackMessages,
} from "src/constants/constants";
import { CourseServerModel } from "src/types/server";
import { coursesResponseToEditCourses } from "src/utils/server-to-client-mapping";

import CoursesList from "./CoursesList";
import { Course, ID } from "../../../types/index";
import RequestHandler from "../../RequestHandler";
import RequestWrapper from "../../RequestWrapper";
import AdminHeader from "../AdminHeader";
import CourseFormContainer from "../course-form/CourseFormContainer";
import {
  getDeletedMaterialIds,
  getDeletedSectionsIds,
  getMaterialsWithPosition,
  getSectionsWithPositions,
} from "../course-form/utils";

type EditCoursesState = {
  isLoading: boolean;
  getCoursesErrorMessage: null | string;
  allCourses: [] | Course[];
  editingCourseId: ID | null;
};

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

  onClickEditCourse = (courseId: ID) => {
    this.setState({ editingCourseId: courseId });
  };

  onEditCourseCancelled = () => {
    this.setState({ editingCourseId: null });
  };

  onCourseEditedSuccess = (editedCourse: Course) => {
    const { allCourses, editingCourseId } = this.state;

    const updatedCoursesWithEditedCourse = allCourses.map(course => {
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

  onCourseDeletedSuccess = (courseId: ID) => {
    const { allCourses } = this.state;
    const coursesWithoutDeletedCourse = allCourses.filter(
      course => course.id !== courseId,
    );

    this.setState({
      allCourses: coursesWithoutDeletedCourse,
      editingCourseId: null,
    });

    toast.success(feedbackMessages.deleteCourseSuccess, REACT_TOAST_DURATION);
  };

  static getRequestBody = (course: Course, initialCourse: Course) => {
    return {
      edited_course_id: course.id,
      edited_course: {
        ...course,
        materials: getMaterialsWithPosition(course),
        sections: getSectionsWithPositions(course),
      },
      deleted_section_ids_map: getDeletedSectionsIds(course, initialCourse),
      deleted_materials_ids: getDeletedMaterialIds(course, initialCourse),
    };
  };

  onSuccess = (result: CourseServerModel[]) => {
    this.setState({
      allCourses: coursesResponseToEditCourses(result),
      isLoading: false,
    });
  };

  onError = (getCoursesErrorMessage: string, error = "") => {
    console.log(error || getCoursesErrorMessage);

    this.setState({
      getCoursesErrorMessage,
      isLoading: false,
    });
  };

  render() {
    const { isLoading, allCourses, editingCourseId, getCoursesErrorMessage } =
      this.state;

    const editingCourse = allCourses.find(
      course => course.id === editingCourseId,
    );

    return (
      <>
        <AdminHeader title="Edit Courses" />
        <RequestWrapper
          endpoint="/courses"
          requestOnMount
          onRequestBegin={this.onBeginRequestCourses}
          onError={(error: string) =>
            this.onError("Failed to load courses.", error)
          }
          onSuccess={this.onSuccess}
          render={requestCourses => {
            return (
              <RequestHandler
                isLoading={isLoading}
                error={getCoursesErrorMessage}
                shouldShowWarning={!allCourses?.length}
                warningMessage="You don't have any courses yet..."
                onClick={requestCourses}
              >
                {editingCourse ? (
                  <CourseFormContainer
                    initialCourse={editingCourse}
                    isEditing
                    saveFormEndpoint="/edit-course"
                    getRequestBody={EditCourses.getRequestBody}
                    onCourseSavedSuccess={this.onCourseEditedSuccess}
                    onCourseFormCancelled={this.onEditCourseCancelled}
                    onCourseDeletedSuccess={this.onCourseDeletedSuccess}
                  />
                ) : (
                  <CoursesList
                    courses={allCourses}
                    onClickEditCourse={this.onClickEditCourse}
                  />
                )}
              </RequestHandler>
            );
          }}
        />
      </>
    );
  }
}
