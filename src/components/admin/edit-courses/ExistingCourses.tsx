import { Component } from "react";
import { Alert } from "react-bootstrap";
import { AxiosProgressEvent } from "axios";

import { Course, FormSubmitEvent } from "../../../types/index";
import {
  areSomeVideosCurrentlyUploading,
  getRequest,
  getUpdatedCourses,
  getUpdatedCoursesWithEditFlagRemovedForEditedCourse
} from "../../../utils/utils";
import { API_DOMAIN } from "../../../constants/constants";
import { AuthContext, AuthContextType } from "src/contexts/AuthContext";

import DeleteCourseOverlay from "../../overlays/DeleteCourseOverlay";
import ExistingCourse from "./ExistingCourse";
import ExistingCoursesContainer from "./ExistingCoursesContainer";
import CourseErrorLoadingHandler from "src/components/CourseErrorLoadingHandler";

type EditCoursesState = {
  isLoading: boolean,
  areActionsDisabled: boolean,
  successMessage: null | string,
  courseErrorMessage: null | string,
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
    courseErrorMessage: null,
    deleteCourseErrorMessage: null,
    allCourses: [],
    savedCourses: [],
    courseIdToDelete: null,
  };
  context: AuthContextType;

  static contextType = AuthContext;

  getCourses = () => {
    this.setState({ isLoading: true, courseErrorMessage: null });

    getRequest({
      endpoint: "/courses",
      onSuccess: this.onSuccess,
      onError: (error) => this.onError("Loading courses failed", error),
      onUnauthorised: this.onUnauthorised,
    });
  };

  componentDidMount () {
    this.getCourses();
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
    this.setState({
      allCourses: this.state.savedCourses,
      areActionsDisabled: false,
      courseErrorMessage: null
    });
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

  onSuccess = (result: Course[]) => {
    this.setState({
      allCourses: result,
      savedCourses: result,
      isLoading: false
    });
  };

  onError = (courseErrorMessage: string, error = "") => {
    console.log(">>> error: ", error || courseErrorMessage);

    this.setState({
      areActionsDisabled: false,
      courseErrorMessage,
      isLoading: false,
    });
  };

  onUnauthorised = () => {
    const { logout } = this.context;

    logout();
  };

  getDeletedSectionsIds = (editedCourse: Course) => {
    // Getting the ids of the deleted sections so the back end can delete them in the table
    const uneditedVersionOfEditedCourse = this.state.savedCourses.find((course) => course.id === editedCourse.id);

    const sectionsThatDontExistInSavedCourse = uneditedVersionOfEditedCourse?.sections.filter((section) => {
      if (editedCourse.sections.some((editedCourseSection) => editedCourseSection.id === section.id)) {
        return false;
      }

      return true;
    });

    const idsOfDeletedSections = sectionsThatDontExistInSavedCourse?.map((section) => section.id);

    return idsOfDeletedSections;
  };

  getEditedCourseWithSectionPositions = (editedCourse: Course) => {
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

    return editedCourseWithSectionPositions;
  };

  onSuccessfullySavedEditedCourse = (editedCourse: Course, courseId: number) => {
    const editedCourseId = editedCourse.id;

    this.setState({
      areActionsDisabled: false,
      allCourses: getUpdatedCoursesWithEditFlagRemovedForEditedCourse(editedCourseId, this.state.allCourses),
      savedCourses: this.getUpdatedSavedCoursesState(editedCourse, courseId),
      successMessage: "Successfully saved edited course!",
    });

    this.handleSuccessMessageAfterSavingEditedCourse();
  };

  onClickSaveEditedCourse = async (event: FormSubmitEvent, courseId: number) => {
    event.preventDefault();

    const editedCourse = this.state.allCourses.find((course) => course.id === courseId);

    // To prevent Typescript errors
    if (!editedCourse) {
      return;
    }

    const editedCourseId = editedCourse.id;

    if (!areSomeVideosCurrentlyUploading(editedCourse)) {
      this.setState({ areActionsDisabled: true, courseErrorMessage: null });

      try {
        const response = await fetch(`${API_DOMAIN}/edit-course`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            edited_course_id: editedCourseId,
            course: this.getEditedCourseWithSectionPositions(editedCourse),
            deleted_sections_ids: this.getDeletedSectionsIds(editedCourse),
          }),
        });

        const result = await response.json();

        if (!result.error) {
          this.onSuccessfullySavedEditedCourse(editedCourse, courseId);

        } else {
          if (response.status === 401) {
            this.onUnauthorised();
          } else {
            this.onError("Failed to save edited course. Try again.", result.error);
          }
        }
      } catch (saveEditedCourseError) {
        this.onError("Failed to save edited course. Try again.", saveEditedCourseError as string);
      }
    } else {
      this.onError("Please make sure videos are uploaded for every section.");
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
        credentials: "include",
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
        if (response.status === 401) {
          this.onUnauthorised();
        } else {
          this.onError("Deleting course failed. Try again.", result.error);
        }
      }
    } catch (e) {
      console.log(e);
      this.setState({ areActionsDisabled: false, deleteCourseErrorMessage: "Deleting course failed. Try again." });
    }
  };

  render() {
    const { isLoading, allCourses, courseErrorMessage } = this.state;

    return (
      <>
        <ExistingCoursesContainer>
          <CourseErrorLoadingHandler
            isLoading={isLoading}
            error={courseErrorMessage}
            onClick={this.getCourses}
            courses={allCourses}>
            {this.state.successMessage
                ? <Alert variant="success">{this.state.successMessage}</Alert>
                : null
            }

            <div>
              {allCourses.map((course, index) => {
                  return (
                    <ExistingCourse
                      key={course.id}
                      index={index}
                      course={course}
                      areActionsDisabled={this.state.areActionsDisabled}
                      courseErrorMessage={this.state.courseErrorMessage}
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
          </CourseErrorLoadingHandler>
        </ExistingCoursesContainer>

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