import { Alert } from "react-bootstrap";

import { Course } from "src/types";

import CoursesListView from "./CoursesListView";
import Navbar from "../nav-and-sidebars/Navbar";

interface Props {
  courses: Course[],
  successMessage: string | null,
  onClickHandleEditingCourse: (courseId: number | null) => void,

}
const CoursesListContainer: React.FC<Props> = ({ courses, successMessage, onClickHandleEditingCourse }) => {
  return (
    <>
      <Navbar title="Existing Courses" />

      {successMessage
        ? <Alert variant="success">{successMessage}</Alert>
        : null
      }

      <table className="table table-bordered mt-3">
        {courses.map((course) => {
          return (
            <CoursesListView
              course={course}
              onClickHandleEditingCourse={onClickHandleEditingCourse}/>
          );
        })}
      </table>
    </>
  );
};

export default CoursesListContainer;