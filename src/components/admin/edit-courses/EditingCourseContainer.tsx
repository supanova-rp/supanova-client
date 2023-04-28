import { Component } from "react";
import { Alert, Form } from "react-bootstrap";
import { AxiosProgressEvent } from "axios";

import { Course, FormSubmitEvent } from "src/types";
import { areSomeVideosCurrentlyUploading, getUpdatedCourse, request } from "src/utils/utils";

import EditingCourse from "./EditingCourse";
import DeleteCourseOverlay from "src/components/overlays/DeleteCourseOverlay";

type EditCourseState = {
  course: Course,
  courseErrorMessage: null | string,
  areActionsDisabled: boolean,
  courseIdToDelete: null | number,
  deleteCourseErrorMessage: null | string,
}

interface EditCourseProps {
  initialCourse: Course,
  editingCourseId: number | null,
  onUnauthorised: () => void,
  onClickHandleEditingCourse: (editingCourseId: number | null) => void;
  handleSuccessMessageAfterSavingEditedCourse: () => void,
  onEditCourseFinished: () => void,
}

export default class EditingCourseContainer extends Component <EditCourseProps> {
  state: EditCourseState = {
    courseErrorMessage: null,
    areActionsDisabled: false,
    courseIdToDelete: null,
    deleteCourseErrorMessage: null,
    course: this.props.initialCourse,
  };

  onUpdateStateAfterCancellingFileUpload = (sectionId: number) => {
    const { course } = this.state;

    const courseWithResetVideoUploadProgress = getUpdatedCourse(course, sectionId, "uploadProgress", null);

    this.setState({ course: courseWithResetVideoUploadProgress });
  };

  onFileUploaded = (sectionId: number, videoUrl: string) => {
    const { course } = this.state;

    const courseWithUpdatedVideoUrl = getUpdatedCourse(course, sectionId, "videoUrl", videoUrl);

    this.setState({ course: courseWithUpdatedVideoUrl });
  };

  onFileUploadProgress = (data: AxiosProgressEvent, sectionId: number) => {
    const { course } = this.state;

    const courseWithUpdatedVideoUploadProgress = getUpdatedCourse(course, sectionId, "uploadProgress", data.progress);

    this.setState({ course: courseWithUpdatedVideoUploadProgress });
  };

  onClickAddNewSection = () => {
    const { course } = this.state;

    const updatedCourseWithNewSection = {
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

    this.setState({ course: updatedCourseWithNewSection });
  };

  onChangeCourseField = (key: string, newInputValue: string) => {
    const { course } = this.state;

    const updatedCourse = {
      ...course,
      [key]: newInputValue,
    };

    this.setState({ course: updatedCourse });
  };

  onChangeSectionTitle = (sectionId: number, newInputValue: string) => {
    const { course } = this.state;

    const updatedCourse = course.sections.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          title: newInputValue,
        };
      }

      return section;
    });

    this.setState({ course: updatedCourse });
  };

  handleRemoveSection = (sectionId: number) => {
    const { course } = this.state;

    const updatedSectionsMinusRemovedSection = course.sections.filter((section) => sectionId !== section.id);

    const updatedCourse = {
      ...course,
      sections: updatedSectionsMinusRemovedSection,
    };

    this.setState({ course: updatedCourse });
  };

  onClickHandleShowingDeleteOverlay = (value: number | null) => {
    this.setState({ courseIdToDelete: value, deleteCourseErrorMessage: null });
  };

  onClickDeleteCourse = async () => {
    const { onUnauthorised } = this.props;

    this.setState({
      areActionsDisabled: true,
      deleteCourseErrorMessage: null,
    });

    const requestBody = {
      course_id: this.state.courseIdToDelete,
    };

    request({
      endpoint: "/delete-course",
      method: "DELETE",
      requestBody,
      onSuccess: this.onSuccessfullyDeletedCourse,
      onError: (deleteCourseError: string) => this.onError("Deleting course failed. Try again.", deleteCourseError),
      onUnauthorised,
    });
  };

  onSuccessfullyDeletedCourse = () => {
    const { onEditCourseFinished } = this.props;

    this.setState({
      areActionsDisabled: false,
      courseIdToDelete: null,
    });

    onEditCourseFinished();
  };

  getDeletedSectionsIds = () => {
    const { course } = this.state;
    const { initialCourse } = this.props;

    // Getting the ids of the deleted sections so the back end can delete them in the table
    const sectionsThatDontExistInEditedCourse = initialCourse.sections.filter((section) => {
      const sectionExistsInEditedCourse = course.sections.some((editedCourseSection) => {
        return editedCourseSection.id === section.id;
      });

      if (sectionExistsInEditedCourse) {
        return false;
      }

      return true;
    });

    const idsOfDeletedSections = sectionsThatDontExistInEditedCourse?.map((section) => section.id);

    return idsOfDeletedSections;
  };

  getEditedCourseWithSectionPositions = () => {
    const { course } = this.state;

    const sectionsWithPositions = course.sections.map((section, index) => {
      return {
        ...section,
        position: index,
      };
    });

    const editedCourseWithSectionPositions = {
      ...course,
      sections: sectionsWithPositions,
    };

    return editedCourseWithSectionPositions;
  };

  onSuccessfullySavedEditedCourse = () => {
    const { handleSuccessMessageAfterSavingEditedCourse } = this.props;

    this.setState({
      areActionsDisabled: false,
    });

    handleSuccessMessageAfterSavingEditedCourse();
  };

  onClickCancelEditingCourse = () => {
    const { onEditCourseFinished } = this.props;

    onEditCourseFinished();
  };

  onClickSaveEditedCourse = async (event: FormSubmitEvent) => {
    event.preventDefault();

    const { course } = this.state;
    const { onUnauthorised, editingCourseId } = this.props;

    if (!areSomeVideosCurrentlyUploading(course)) {
      this.setState({
        areActionsDisabled: true,
        courseErrorMessage: null,
      });

      const requestBody = {
        edited_course_id: editingCourseId,
        edited_course: this.getEditedCourseWithSectionPositions(),
        deleted_sections_ids: this.getDeletedSectionsIds(),
      };

      request({
        endpoint: "/edit-course",
        method: "PUT",
        requestBody,
        onSuccess: () => this.onSuccessfullySavedEditedCourse(),
        onError: (saveEditedCourseError: string) => this.onError("Failed to save edited course. Try again.", saveEditedCourseError),
        onUnauthorised,
      });
    } else {
      this.onError("Please make sure videos are uploaded for every section.");
    }
  };

  onError = (courseErrorMessage: string, error = "") => {
    console.log(">>> error: ", error || courseErrorMessage);

    this.setState({
      areActionsDisabled: false,
      courseErrorMessage,
    });
  };

  render() {
    const {
      course,
      courseErrorMessage,
      areActionsDisabled,
      courseIdToDelete,
      deleteCourseErrorMessage
    } = this.state;

    const { onClickHandleEditingCourse } = this.props;

    const alertVariant = courseErrorMessage?.includes("Please") ? "warning" : "danger";

    if (course) {
      return (
        <>
          <Form onSubmit={(e) => this.onClickSaveEditedCourse(e)}>
            {courseErrorMessage
              ? <Alert variant={alertVariant}>{courseErrorMessage}</Alert>
              : null
            }

            <div className="my-4">
              <EditingCourse
                editingCourse={course}
                areActionsDisabled={areActionsDisabled}
                onChangeCourseField={this.onChangeCourseField}
                onChangeSectionTitle={this.onChangeSectionTitle}
                onFileUploaded={this.onFileUploaded}
                onFileUploadProgress={this.onFileUploadProgress}
                onUpdateStateAfterCancellingFileUpload={this.onUpdateStateAfterCancellingFileUpload}
                handleRemoveSection={this.handleRemoveSection}
                onClickAddNewSection={this.onClickAddNewSection}
                onClickHandleShowingDeleteOverlay={this.onClickHandleShowingDeleteOverlay}
                onClickCancelEditingCourse={this.onClickCancelEditingCourse}
                onClickHandleEditingCourse={onClickHandleEditingCourse} />
            </div>
          </Form>

          {courseIdToDelete
            ? (
              <DeleteCourseOverlay
                areActionsDisabled={areActionsDisabled}
                deleteCourseErrorMessage={deleteCourseErrorMessage}
                onClickHandleShowingDeleteOverlay={this.onClickHandleShowingDeleteOverlay}
                onClickDeleteCourse={this.onClickDeleteCourse} />
            )
            : null
          }
        </>
      );
    }

    return null;

  }
};