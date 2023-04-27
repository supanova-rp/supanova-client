import { Alert, Form } from "react-bootstrap";

import { Course } from "src/types";

import EditingCourseHeader from "./EditingCourseHeader";
import EditingCourse from "./EditingCourse";

interface Props {
  editingCourse: undefined | Course,
  onClickStartEditingCourse: (parameter: null) => void,
  onClickHandleShowingDeleteOverlay: (courseId: number | null) => void,
}

const EditingCourseContainer: React.FC<Props> = ({
  editingCourse,
  onClickStartEditingCourse,
  onClickHandleShowingDeleteOverlay,
}) => {
  if (editingCourse) {
    const alertVariant = courseErrorMessage?.includes("Please") ? "warning" : "danger";

    return (
      <Form onSubmit={(e) => onClickSaveEditedCourse(e, editingCourse.id)}>
        {courseErrorMessage
          ? <Alert variant={alertVariant}>{courseErrorMessage}</Alert>
          : null
        }

        <div className="my-4">
          <EditingCourseHeader
            editingCourse={editingCourse}
            onClickStartEditingCourse={onClickStartEditingCourse}
            onClickHandleShowingDeleteOverlay={onClickHandleShowingDeleteOverlay} />

          <EditingCourse />
        </div>
      </Form>

    );
  }
};

export default EditingCourseContainer;