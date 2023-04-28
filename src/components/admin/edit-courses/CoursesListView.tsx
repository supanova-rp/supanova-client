import { Button } from "react-bootstrap";

import { Course } from "../../../types/index";

interface Props {
  course: Course,
  onClickHandleEditingCourse: (courseId: number | null) => void,
}

const CourseListView: React.FC<Props> = ({
  course,
  onClickHandleEditingCourse,
}) => {
  return (
    <tr>
      <td className="section-row-data">
        <Button
          className="d-flex w-100 rounded-0 btn-light row-buttons"
          onClick={() => onClickHandleEditingCourse(course.id)}>
          <div className="d-flex flex-column">
            <h5 className="my-3 row-course-title">{`${course.title}`}</h5>
            {course.sections.map((section, index) => {
              return (
                <p
                  key={`${index}-${section.title}`}
                  className="text-secondary row-section-title">{section.title}
                </p>
              );
            })}
          </div>
        </Button>
      </td>
    </tr>
  );
};

export default CourseListView;
