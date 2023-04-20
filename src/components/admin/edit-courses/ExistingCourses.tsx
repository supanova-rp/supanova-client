import { Component } from "react";
import { Alert } from "react-bootstrap";
import { AxiosProgressEvent } from "axios";
import { PulseLoader } from "react-spinners";

import { Course, FormSubmitEvent } from "../../../types/index";
import { getUpdatedCourses } from "../../../utils/utils"
import { API_DOMAIN } from "../../../constants/constants";
import { colors } from "src/constants/colorPalette";

import DeleteCourseOverlay from "../../overlays/DeleteCourseOverlay";
import ExistingCourse from "./ExistingCourse";
import ExistingCoursesContainer from "./ExistingCoursesContainer";

type EditCoursesState = {
  isLoading: boolean,
  areActionsDisabled: boolean,
  successMessage: null | string,
  errorMessage: null | string,
  deleteCourseErrorMessage: null | string,
  allCourses: [] | Course[],
  savedCourses: [] | Course[],
  courseIdToDelete: null | number,
}

export default class EditCourses extends Component {
  state: EditCoursesState = {
    isLoading: true,
    areActionsDisabled: false,
    successMessage: null,
    errorMessage: null,
    deleteCourseErrorMessage: null,
    allCourses: [],
    savedCourses: [],
    courseIdToDelete: null,
  };

  async componentDidMount () {
      const response = await fetch(`${API_DOMAIN}/courses`);
      const courseResults = await response.json();

      this.setState({ allCourses: courseResults, savedCourses: courseResults, isLoading: false })
    };

  onUpdateStateAfterCancellingFileUpload = (sectionId: number) => {
    const coursesWithResetVideoUploadProgress = getUpdatedCourses(this.state.allCourses, sectionId, "uploadProgress", null);

    this.setState({ allCourses: coursesWithResetVideoUploadProgress });
  };

  onFileUploaded = (sectionId: number, videoUrl: string) => {
    const coursesWithUpdatedVideoUrl = getUpdatedCourses(this.state.allCourses, sectionId, "videoUrl", videoUrl);

    this.setState({ allCourses: coursesWithUpdatedVideoUrl });
  };

  onFileUploadProgress = (data: AxiosProgressEvent, sectionId: number) => {
    const coursesWithUpdatedVideoUploadProgress = getUpdatedCourses(this.state.allCourses, sectionId, "uploadProgress", data.progress);

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
    this.setState({ allCourses: this.state.savedCourses, areActionsDisabled: false, errorMessage: null });
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

  onError = (errorMessage: string) => {
    this.setState({
      areActionsDisabled: false,
      errorMessage,
    });
  }

  onClickSaveEditedCourse = async (event: FormSubmitEvent, courseId: number) => {
    event.preventDefault();

    const editedCourse = this.state.allCourses.find((course) => course.id === courseId);

    // To prevent Typescript errors
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
      return typeof section.uploadProgress === "number" && section.uploadProgress < 1;
    });

    if (!someVideoCurrentlyUploading) {
      this.setState({ areActionsDisabled: true, errorMessage: null });

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
          method: "PUT",
          headers: { "Content-Type": "application/json" },
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
            areActionsDisabled: false,
            allCourses: updatedCoursesWithEditFlagRemovedForEditedCourse,
            savedCourses: this.getUpdatedSavedCoursesState(editedCourse, courseId),
            successMessage: "Successfully saved edited course!",
          });

          this.handleSuccessMessageAfterSavingEditedCourse();
        } else {
          this.onError("Failed to save edited course. Try again.")
        }
      } catch (saveEditedCourseError) {
        console.log(">>> saveEditedCourseError: ", saveEditedCourseError);

        this.onError("Failed to save edited course. Try again.")
      }
    } else {
      this.onError("Please make sure videos are uploaded for every section.")
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
              title: "",
              videoUrl: "",
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
      this.setState({ areActionsDisabled: true, deleteCourseErrorMessage: null });

      const response = await fetch(`${API_DOMAIN}/delete-course`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          course_id: this.state.courseIdToDelete,
        }),
      });

      const result = await response.json();

      if (!result.error) {
        const coursesMinusDeletedCourse = this.state.allCourses.filter((course) => course.id !== this.state.courseIdToDelete);

        this.setState({
          areActionsDisabled: false,
          courseIdToDelete: null,
          allCourses: coursesMinusDeletedCourse,
          savedCourses: coursesMinusDeletedCourse
        });
      } else {
        this.setState({ areActionsDisabled: false, deleteCourseErrorMessage: "Deleting course failed. Try again." });
      }
    } catch (e) {
      console.log(e);
      this.setState({ areActionsDisabled: false, deleteCourseErrorMessage: "Deleting course failed. Try again." });
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <ExistingCoursesContainer
          renderContent={() => (
            <div className="w-100 h-100 d-flex justify-content-center align-items-center pb-5">
              <PulseLoader color={colors.orange} className="pb-5"/>
            </div>
          )} />
      )
    }

    if (!this.state.allCourses.length) {
      return (
        <ExistingCoursesContainer
          renderContent={() => (
            <Alert variant="warning">You don&apos;t have any courses yet.</Alert>
          )} />
      );
    }

    return (
      <>
        <ExistingCoursesContainer
          renderContent={() => (
            <>
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
                      areActionsDisabled={this.state.areActionsDisabled}
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
            </>
          )}/>

        {this.state.courseIdToDelete
          ? (
            <DeleteCourseOverlay
              areActionsDisabled={this.state.areActionsDisabled}
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
