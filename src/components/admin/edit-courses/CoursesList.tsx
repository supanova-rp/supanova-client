import { Course } from "src/types";

interface Props {
  courses: Course[];
  onClickEditCourse: (courseId: number) => void;
}
const CoursesList: React.FC<Props> = ({ courses, onClickEditCourse }) => {
  return (
    <>
      {courses.map(course => {
        return (
          <div
            key={course.id}
            className="courses-list-container"
            onClick={() => onClickEditCourse(course.id)}
          >
            <div className="d-flex flex-column w-100">
              <div className="d-flex align-items-center">
                <div className="courses-list-vertical-line" />
                <h5 className="my-3 align-self-start courses-list-course-title">{`${course.title}`}</h5>
              </div>
              {course.sections.map((section, index) => {
                return (
                  <p
                    key={`${index}-${section.title}`}
                    className="text-secondary courses-list-section-title"
                  >
                    {section?.type === "quiz" ? "Quiz" : section.title}
                  </p>
                );
              })}
              <hr className="w-100 courses-list-horizontal-line" />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CoursesList;
