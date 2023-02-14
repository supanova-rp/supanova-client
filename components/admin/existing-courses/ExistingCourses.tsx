import React from 'react';
import { Alert, Card } from 'react-bootstrap';
import { AxiosProgressEvent } from 'axios';

import { ServerSideCourses } from '@/index';

import { getUpdatedSectionsWithAddedVideoInfoExistingCoursesTab } from '@/utils/utils';

import Navbar from '../nav-and-sidebars/Navbar';
import Course from './Course';

interface Props {
  courses: ServerSideCourses
}

export default class EditCourses extends React.Component<Props> {
  state = {
    allCourses: this.props.courses,
    // savedCourses: this.props.courses,
  };

  // TODO: when you click cancel -> replace the course that was cancelled in allCourses with the course object
  // in savedCourses

  // TODO: when you click save -> update the course in savedCourses with the course object that was saved from allCourses

  // TODO: handle adding a new section

  // Handle sending all the updated courses to the back end every time you click save

  onUpdateStateAfterCancellingFileUpload = (sectionId: number) => {
    const coursesWithResetVideoUploadProgress = getUpdatedSectionsWithAddedVideoInfoExistingCoursesTab(this.state.allCourses, sectionId, 'uploadProgress', null);

    this.setState({ allCourses: coursesWithResetVideoUploadProgress });
  };

  onFileUploaded = (sectionId: number, videoUrl: string) => {
    const coursesWithUpdatedVideoUrl = getUpdatedSectionsWithAddedVideoInfoExistingCoursesTab(this.state.allCourses, sectionId, 'video_url', videoUrl);

    this.setState({ allCourses: coursesWithUpdatedVideoUrl });
  };

  onFileUploadProgress = (data: AxiosProgressEvent, sectionId: number) => {
    const coursesWithUpdatedVideoUploadProgress = getUpdatedSectionsWithAddedVideoInfoExistingCoursesTab(this.state.allCourses, sectionId, 'uploadProgress', data.progress);

    this.setState({ allCourses: coursesWithUpdatedVideoUploadProgress });
  };

  handleRemoveSection = (sectionId: number) => {
    const updatedCourses = this.state.allCourses.map((course) => {
      const updatedSectionsMinusRemovedSection = course.sections.filter((section) => sectionId !== section.id);

      return {
        ...course,
        sections: updatedSectionsMinusRemovedSection,
      };
    });

    this.setState({ allCourses: updatedCourses });
  };

  onClickHandleEditCourse = (courseId: number, value: boolean) => {
    const updatedCoursesWithEditFlag = this.state.allCourses.map((course) => {
      if (course.id === courseId) {
        return {
          ...course,
          isEditing: value,
        };
      }

      return course;
    });

    this.setState({ allCourses: updatedCoursesWithEditFlag });
  };

  onChangeCourseField = (courseId: number, key: string, newInputValue: string) => {
    const updatedCourses = this.state.allCourses.map((course) => {
      if (course.id === courseId) {
        return {
          ...course,
          [key]: newInputValue,
        };
      }

      return course;
    });

    this.setState({ allCourses: updatedCourses });
  };

  onChangeSectionTitleField = (sectionId: number, newInputValue: string) => {
    const updatedCourses = this.state.allCourses.map((course) => {
      const updatedSections = course.sections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            title: newInputValue,
          };
        }

        return section;
      });

      return {
        ...course,
        sections: updatedSections,
      };
    });

    this.setState({ allCourses: updatedCourses });
  };

  onClickAddNewSection = () => {

  };

  render() {
    if (!this.state.allCourses.length) {
      return (
        <Card className="w-100 p-3 d-flex mh-100 rounded-0">
          <Card.Body>
            <Navbar title="Edit Courses" />
            <Alert variant="warning">You don&apos;t have any courses yet.</Alert>
          </Card.Body>
        </Card>
      );
    }

    return (
      <Card className="w-100 p-3 d-flex mh-100 rounded-0">
        <Card.Body>
          <Navbar title="Edit Courses" />
          <div>
            {this.state.allCourses.map((course, index) => {
              return (
                <Course
                  key={course.id}
                  index={index}
                  course={course}
                  onClickHandleEditCourse={this.onClickHandleEditCourse}
                  onChangeCourseField={this.onChangeCourseField}
                  onChangeSectionTitleField={this.onChangeSectionTitleField}
                  onFileUploaded={this.onFileUploaded}
                  onFileUploadProgress={this.onFileUploadProgress}
                  onUpdateStateAfterCancellingFileUpload={this.onUpdateStateAfterCancellingFileUpload}
                  handleRemoveSection={this.handleRemoveSection}
                  onClickAddNewSection={this.onClickAddNewSection} />
              );
            })}
          </div>
        </Card.Body>
      </Card>
    );
  }
}
