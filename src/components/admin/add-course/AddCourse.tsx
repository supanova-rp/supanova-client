import { Component } from "react";
import toast from "react-hot-toast";
import {
  REACT_TOAST_DURATION,
  feedbackMessages,
} from "src/constants/constants";
import { Course } from "src/types";

import AdminHeader from "../AdminHeader";
import CourseFormContainer from "../course-form/CourseFormContainer";
import {
  getInitialCourseState,
  getMaterialsWithPosition,
  getSectionsWithPositions,
} from "../course-form/utils";

export default class AddCourse extends Component {
  initialCourse = getInitialCourseState();

  state = {
    courseFormKey: Date.now(),
  };

  onCourseAddedSuccess = () => {
    this.initialCourse = getInitialCourseState();

    this.setState({
      courseFormKey: Date.now(),
    });

    toast.success(feedbackMessages.addCourseSuccess, REACT_TOAST_DURATION);
  };

  onAddCourseCancelled = () => {
    this.initialCourse = getInitialCourseState();

    this.setState({
      courseFormKey: Date.now(),
    });
  };

  static getRequestBody = (course: Course) => {
    return {
      id: course.id,
      title: course.title,
      description: course.description,
      completionTitle: course.completionTitle,
      completionMessage: course.completionMessage,
      materials: getMaterialsWithPosition(course),
      sections: getSectionsWithPositions(course),
    };
  };

  render() {
    const { courseFormKey } = this.state;

    return (
      <>
        <AdminHeader title="Add a New Course" />
        <CourseFormContainer
          key={courseFormKey}
          initialCourse={this.initialCourse}
          saveFormEndpoint="/add-course"
          getRequestBody={AddCourse.getRequestBody}
          onCourseSavedSuccess={this.onCourseAddedSuccess}
          onCourseFormCancelled={this.onAddCourseCancelled}
        />
      </>
    );
  }
}
