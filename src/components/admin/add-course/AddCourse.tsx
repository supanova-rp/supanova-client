/* eslint-disable react/no-array-index-key */
import { Component } from "react";
import { Card, Alert } from "react-bootstrap";

import {
  getInitialCourseState,
  getSectionsWithPositions
} from "../../../utils/utils";
import { Course } from "src/types";

import Navbar from "../nav-and-sidebars/Navbar";
import CourseForm from "../course-form/CourseForm";

export default class AddCourse extends Component {

  initialCourse = getInitialCourseState();

  state = {
    courseKey: Date.now(),
    successMessage: null,
  };

  onSuccessfullyAddedNewCourse = () => {
    this.initialCourse = getInitialCourseState();

    this.setState({
      courseKey: Date.now(),
      successMessage: "Successfully created new course!"
    });

    setTimeout(() => {
      this.setState({ successMessage: null });
    }, 3000);
  };

  onCancelAddingNewCourse = () => {
    this.initialCourse = getInitialCourseState();

    this.setState({
      courseKey: Date.now(),
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
    const { successMessage, courseKey } = this.state;

    return (
      <Card className="w-100 p-3 d-flex rounded-0">
        <Card.Body>
          <Navbar title="Add a New Course" />

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
            key={courseKey}
            initialCourse={this.initialCourse}
            getRequestOptions={this.getRequestOptions}
            onCourseSavedSuccess={this.onSuccessfullyAddedNewCourse}
            onCourseFormCancelled={this.onCancelAddingNewCourse} />
        </Card.Body>
      </Card>
    );
  }
}
