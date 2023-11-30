import { Component } from "react";
import toast from "react-hot-toast";

import {
  getInitialCourseState,
  getSectionsWithPositions
} from "../../../utils/utils";
import { Course } from "src/types";
import { feedbackMessages } from "src/constants/constants";

import AdminHeader from "../AdminHeader";
import CourseFormContainer from "../course-form/CourseFormContainer";

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

    toast.success(feedbackMessages.addCourseSuccess);
  };

  onAddCourseCancelled = () => {
    this.initialCourse = getInitialCourseState();

    this.setState({
      courseFormKey: Date.now(),
    });
  };

  getRequestBody = (course: Course) => {
    return {
      title: course.title,
      description: course.description,
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
          getRequestBody={this.getRequestBody}
          onCourseSavedSuccess={this.onCourseAddedSuccess}
          onCourseFormCancelled={this.onAddCourseCancelled} />
      </>
    );
  }
}
