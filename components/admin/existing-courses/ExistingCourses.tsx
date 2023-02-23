import React from 'react';
import { Alert, Card } from 'react-bootstrap';
import { AxiosProgressEvent } from 'axios';

import { Course, FormSubmitEvent } from '@/index';
import { getUpdatedCourses } from '@/utils/utils';
import { API_DOMAIN } from '@/constants/constants';

import DeleteCourseOverlay from '@/components/overlays/DeleteCourseOverlay';
import Navbar from '../nav-and-sidebars/Navbar';
import ExistingCourse from './ExistingCourse';

interface Props {
  courses: Course[],
  refreshData: () => void,
}

export default class EditCourses extends React.Component<Props> {
  state = {
    isLoading: false,
    successMessage: null,
    errorMessage: null,
    deleteCourseErrorMessage: null,
    allCourses: this.props.courses,
    savedCourses: this.props.courses,
    courseIdToDelete: null,
  };

  onUpdateStateAfterCancellingFileUpload = (sectionId: number) => {
    const coursesWithResetVideoUploadProgress = getUpdatedCourses(this.state.allCourses, sectionId, 'uploadProgress', null);

    this.setState({ allCourses: coursesWithResetVideoUploadProgress });
  };

  onFileUploaded = (sectionId: number, videoUrl: string) => {
    const coursesWithUpdatedVideoUrl = getUpdatedCourses(this.state.allCourses, sectionId, 'videoUrl', videoUrl);

    this.setState({ allCourses: coursesWithUpdatedVideoUrl });
  };

  onFileUploadProgress = (data: AxiosProgressEvent, sectionId: number) => {
    const coursesWithUpdatedVideoUploadProgress = getUpdatedCourses(this.state.allCourses, sectionId, 'uploadProgress', data.progress);

    this.setState({ allCourses: coursesWithUpdatedVideoUploadProgress });
  };

  handleRemoveSection = (sectionId: number) => {
    const updatedCourses = this.state.allCourses.map((course: Course) => {
      const updatedSectionsMinusRemovedSection = course.sections.filter((section) => sectionId !== section.id);

      return {
        ...course,
        sections: updatedSectionsMinusRemovedSection,
      };
    });

    this.setState({ allCourses: updatedCourses });
  };

  onClickStartEditingCourse = (courseId: number, value: boolean) => {
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

  onClickCancelEditingCourse = () => {
    this.setState({ allCourses: this.state.savedCourses, isLoading: false, errorMessage: null });
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

  onChangeSectionTitle = (sectionId: number, newInputValue: string) => {
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

  getUpdatedSavedCoursesState = (editedCourse: Course, courseId: number) => {
    const updatedSavedCourses = this.state.savedCourses.map((course) => {
      if (courseId === course.id) {
        return {
          ...editedCourse,
        };
      }

      return course;
    });

    return updatedSavedCourses;
  };

  handleSuccessMessageAfterSavingEditedCourse = () => {
    setTimeout(() => {
      this.setState({ successMessage: null });
    }, 3000);
  };

  onClickSaveEditedCourse = async (event: FormSubmitEvent, courseId: number) => {
    event.preventDefault();

    const editedCourse = this.state.allCourses.find((course) => course.id === courseId);

    if (!editedCourse) {
      return;
    }

    const editedCourseId = editedCourse.id;

    // Getting the ids of the deleted sections so the back end can delete them in the table
    const uneditedVersionOfEditedCourse = this.state.savedCourses.find((course) => course.id === editedCourseId);

    const sectionsThatDontExistInSavedCourse = uneditedVersionOfEditedCourse?.sections.filter((section) => {
      if (editedCourse.sections.some((editedCourseSection) => editedCourseSection.id === section.id)) {
        return false;
      }

      return true;
    });

    const idsOfDeletedSections = sectionsThatDontExistInSavedCourse?.map((section) => section.id);

    const someVideoCurrentlyUploading = editedCourse.sections.some((section) => {
      return typeof section.uploadProgress === 'number' && section.uploadProgress < 1;
    });

    const everySectionHasVideoUrl = editedCourse.sections.every((section) => section.videoUrl);

    if (!someVideoCurrentlyUploading && everySectionHasVideoUrl) {
      this.setState({ isLoading: true, errorMessage: null });

      const sectionsWithPositions = editedCourse.sections.map((section, index) => {
        return {
          ...section,
          position: index,
        };
      });

      const editedCourseWithSectionPositions = {
        ...editedCourse,
        sections: sectionsWithPositions,
      };

      try {
        const response = await fetch(`${API_DOMAIN}/edit-course`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            edited_course_id: editedCourseId,
            course: editedCourseWithSectionPositions,
            deleted_sections_ids: idsOfDeletedSections,
          }),
        });

        const result = await response.json();

        if (!result.error) {
          const updatedCoursesWithEditFlagRemovedForEditedCourse = this.state.allCourses.map((course) => {
            if (course.id === editedCourseId) {
              return {
                ...course,
                isEditing: false,
              };
            }

            return course;
          });

          this.setState({
            isLoading: false,
            allCourses: updatedCoursesWithEditFlagRemovedForEditedCourse,
            savedCourses: this.getUpdatedSavedCoursesState(editedCourse, courseId),
            successMessage: 'Successfully saved edited course!',
          });

          this.handleSuccessMessageAfterSavingEditedCourse();

          // this hook makes sure getServerSideProps gets called again so we see the updated courses after saving our edits
          this.props.refreshData();
        } else {
          this.setState({
            isLoading: false,
            errorMessage: 'Failed to save edited course. Try again.',
          });
        }
      } catch (saveEditedCourseError) {
        this.setState({
          isLoading: false,
          errorMessage: 'Failed to save edited course. Try again.',
        });
      }
    } else {
      this.setState({
        isLoading: false,
        errorMessage: 'Please make sure videos are uploaded for every section.',
      });
    }
  };

  onClickAddNewSection = (courseId: number) => {
    const coursesWithNewlyAddedSection = this.state.allCourses.map((course) => {
      if (course.id === courseId) {
        return {
          ...course,
          sections: [
            ...course.sections,
            {
              id: Date.now(),
              title: '',
              videoUrl: '',
              isNewSection: true,
            },
          ],
        };
      }

      return course;
    });

    this.setState({ allCourses: coursesWithNewlyAddedSection });
  };

  onClickHandleShowingDeleteOverlay = (value: number | null) => {
    this.setState({ courseIdToDelete: value, deleteCourseErrorMessage: null });
  };

  onClickDeleteCourse = async () => {
    try {
      this.setState({ isLoading: true, deleteCourseErrorMessage: null });

      const response = await fetch(`${API_DOMAIN}/delete-course`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          course_id: this.state.courseIdToDelete,
        }),
      });

      const result = await response.json();

      if (!result.error) {
        this.props.refreshData();

        const coursesMinusDeletedCourse = this.state.allCourses.filter((course) => course.id !== this.state.courseIdToDelete);

        this.setState({ isLoading: false, courseIdToDelete: null, allCourses: coursesMinusDeletedCourse, savedCourses: coursesMinusDeletedCourse });
      } else {
        this.setState({ isLoading: false, deleteCourseErrorMessage: 'Deleting course failed. Try again.' });
      }
    } catch (e) {
      console.log(e);
      this.setState({ isLoading: false, deleteCourseErrorMessage: 'Deleting course failed. Try again.' });
    }
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
      <>
        <Card className="w-100 p-3 d-flex mh-100 rounded-0">
          <Card.Body>
            <Navbar title="Edit Courses" />
            {this.state.successMessage
              ? <Alert variant="success">{this.state.successMessage}</Alert>
              : null
          }
            <div>
              {this.state.allCourses.map((course, index) => {
                return (
                  <ExistingCourse
                    key={course.id}
                    index={index}
                    course={course}
                    isLoading={this.state.isLoading}
                    errorMessage={this.state.errorMessage}
                    onClickStartEditingCourse={this.onClickStartEditingCourse}
                    onClickCancelEditingCourse={this.onClickCancelEditingCourse}
                    onChangeCourseField={this.onChangeCourseField}
                    onChangeSectionTitle={this.onChangeSectionTitle}
                    onFileUploaded={this.onFileUploaded}
                    onFileUploadProgress={this.onFileUploadProgress}
                    onUpdateStateAfterCancellingFileUpload={this.onUpdateStateAfterCancellingFileUpload}
                    handleRemoveSection={this.handleRemoveSection}
                    onClickAddNewSection={this.onClickAddNewSection}
                    onClickSaveEditedCourse={this.onClickSaveEditedCourse}
                    onClickHandleShowingDeleteOverlay={this.onClickHandleShowingDeleteOverlay} />
                );
              })}
            </div>
          </Card.Body>
        </Card>
        {this.state.courseIdToDelete
          ? (
            <DeleteCourseOverlay
              isLoading={this.state.isLoading}
              deleteCourseErrorMessage={this.state.deleteCourseErrorMessage}
              onClickHandleShowingDeleteOverlay={this.onClickHandleShowingDeleteOverlay}
              onClickDeleteCourse={this.onClickDeleteCourse} />
          )
          : null
      }
      </>
    );
  }
}
