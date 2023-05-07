/* eslint-disable react/no-array-index-key */
import { Component } from "react";
import { Alert } from "react-bootstrap";

import {
  getInitialCourseState,
  getSectionsWithPositions
} from "../../../utils/utils";
import { Course } from "src/types";

import AdminHeader from "../AdminHeader";
import CourseForm from "../course-form/CourseForm";

export default class AddCourse extends Component {

  initialCourse = getInitialCourseState();

  state = {
    courseFormKey: Date.now(),
    successMessage: null,
  };

  onCourseAddedSuccess = () => {
    this.initialCourse = getInitialCourseState();

    this.setState({
      courseFormKey: Date.now(),
      successMessage: "Successfully created new course!"
    });

    setTimeout(() => {
      this.setState({ successMessage: null });
    }, 3000);
  };

  onAddCourseCancelled = () => {
    this.initialCourse = getInitialCourseState();

    this.setState({
      courseFormKey: Date.now(),
      successMessage: null,
    });
  };

  getRequestOptions = (course: Course) => {
    return {
      requestBody: {
        title: course.title,
        description: course.description,
        sections: getSectionsWithPositions(course),
      },
      endpoint: "/add-course",
      method: "POST",
    };
  };

  render() {
    const { successMessage, courseFormKey } = this.state;

    return (
      <>
        <AdminHeader title="Add a New Course" />

        {successMessage
          ? (
            <Alert
              variant="success"
              className="add-course-success">{successMessage}
            </Alert>
          )
          : null
        }

        <CourseForm
          key={courseFormKey}
          initialCourse={this.initialCourse}
          getRequestOptions={this.getRequestOptions}
          onCourseSavedSuccess={this.onCourseAddedSuccess}
          onCourseFormCancelled={this.onAddCourseCancelled} />
      </>
    );
  }
}
