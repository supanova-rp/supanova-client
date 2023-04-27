import CourseForm from "./CourseForm";

const EditingCourse = () => {
  return (
    <>
      <CourseForm
        course={course}
        onChangeCourseField={onChangeCourseField}
        onChangeSectionTitle={onChangeSectionTitle}
        onFileUploaded={onFileUploaded}
        onFileUploadProgress={onFileUploadProgress}
        onUpdateStateAfterCancellingFileUpload={onUpdateStateAfterCancellingFileUpload}
        handleRemoveSection={handleRemoveSection} />
      <AddMoreInputs
        title="Add another section"
        onClick={() => onClickAddNewSection(course.id)} />
      <div className="mb-5">
        <Button
          className="edit-course-save-btn secondary-button"
          type="submit"
          disabled={areActionsDisabled}>Save</Button>
        <Button
          className="btn-danger"
          type="button"
          onClick={onClickCancelEditingCourse}>
          Cancel
        </Button>
      </div>
    </>
  );
};

export default EditingCourse;