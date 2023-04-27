import { Component } from "react";
import { Alert } from "react-bootstrap";
import { AxiosProgressEvent } from "axios";

import {
  Course,
  FormSubmitEvent
} from "../../../types/index";
import {
  areSomeVideosCurrentlyUploading,
  getRequest,
  getUpdatedCourses,
  getUpdatedCoursesWithEditFlagRemovedForEditedCourse,
  request
} from "../../../utils/utils";
import { AuthContext, AuthContextType } from "src/contexts/AuthContext";

import DeleteCourseOverlay from "../../overlays/DeleteCourseOverlay";
import ExistingCoursesContainer from "./ExistingCoursesContainer";
import CourseErrorLoadingHandler from "src/components/CourseErrorLoadingHandler";
import CoursesListView from "./CoursesListView";
import EditingCourseContainer from "./EditingCourseContainer";

type EditCoursesState = {
  isLoading: boolean,
  areActionsDisabled: boolean,
  successMessage: null | string,
  courseErrorMessage: null | string,
  deleteCourseErrorMessage: null | string,
  allCourses: [] | Course[],
  savedCourses: [] | Course[],
  courseIdToDelete: null | number,
  editingCourseId: null | number,
}

export default class EditCourses extends Component {
  state: EditCoursesState = {
    isLoading: true,
    editingCourseId: null,
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
      onError: (error: string) => this.onError("Loading courses failed", error),
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

  onClickStartEditingCourse = (courseId: number | null) => {
    this.setState({ editingCourseId: courseId });
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

  onSuccessfullySavedEditedCourse = (edited_course: Course) => {
    const editedCourseId = edited_course.id;

    this.setState({
      areActionsDisabled: false,
      allCourses: getUpdatedCoursesWithEditFlagRemovedForEditedCourse(editedCourseId, this.state.allCourses),
      savedCourses: this.getUpdatedSavedCoursesState(edited_course, editedCourseId),
      successMessage: "Successfully saved edited course!",
    });

    this.handleSuccessMessageAfterSavingEditedCourse();
  };

  onSuccessfullyDeletedCourse = () => {
    const coursesMinusDeletedCourse = this.state.allCourses.filter((course) => course.id !== this.state.courseIdToDelete);

    this.setState({
      areActionsDisabled: false,
      courseIdToDelete: null,
      allCourses: coursesMinusDeletedCourse,
      savedCourses: coursesMinusDeletedCourse
    });
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

      const requestBody = {
        edited_course_id: editedCourseId,
        edited_course: this.getEditedCourseWithSectionPositions(editedCourse),
        deleted_sections_ids: this.getDeletedSectionsIds(editedCourse),
      };

      request({
        endpoint: "/edit-course",
        method: "PUT",
        requestBody,
        onSuccess: () => this.onSuccessfullySavedEditedCourse(requestBody.edited_course),
        onError: (saveEditedCourseError: string) => this.onError("Failed to save edited course. Try again.", saveEditedCourseError),
        onUnauthorised: this.onUnauthorised,
      });
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
    this.setState({ areActionsDisabled: true, deleteCourseErrorMessage: null });

    const requestBody = {
      course_id: this.state.courseIdToDelete,
    };

    request({
      endpoint: "/delete-course",
      method: "DELETE",
      requestBody,
      onSuccess: this.onSuccessfullyDeletedCourse,
      onError: (deleteCourseError: string) => this.onError("Deleting course failed. Try again.", deleteCourseError),
      onUnauthorised: this.onUnauthorised
    });
  };

  render() {
    const { isLoading, allCourses, courseErrorMessage, editingCourseId } = this.state;

    const editingCourse = allCourses.find((course) => course.id === editingCourseId);

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

            {editingCourseId
              ? (
                <EditingCourseContainer
                  editingCourse={editingCourse}
                  onClickStartEditingCourse={this.onClickStartEditingCourse}
                  onClickHandleShowingDeleteOverlay={this.onClickHandleShowingDeleteOverlay}  />
              )
              : (
                <table className="table table-bordered mt-3">
                  {allCourses.map((course) => {
                    return (
                      <CoursesListView
                        course={course}
                        onClickStartEditingCourse={this.onClickStartEditingCourse}/>
                    );
                  })}
                </table>
              )
            }
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