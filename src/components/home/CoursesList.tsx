import { Course } from "../../types/index";

import TableRow from "./TableRow";

interface CoursesListProps {
  courses: Course[],
  onSelectVideo: (parameter1: number, parameter2: number) => void,
}

const CoursesList: React.FC<CoursesListProps> = ({ courses, onSelectVideo }) => {
  return (
    <div className="px-3 pt-2">
      {courses.map((course, courseIndex) => {
        return (
          <div
            key={`${course.title} ${course.id}`}
            className="mb-5">
            <h5>{`${courseIndex + 1}. ${course.title}`}</h5>
            <p className="mt-3 mb-4">{course.description}</p>
            <table className="table table-bordered mt-3">
              <tbody>
                {course.sections.map((section, sectionIndex) => {
                  const sectionId = courses[courseIndex].sections[sectionIndex].id;
                  const isCompletedInLocalStorage = JSON.parse(localStorage.getItem(`section-progress-${sectionId}`) || "{}").completed;

                  return (
                    <TableRow
                      key={section.id}
                      completed={section.completed || isCompletedInLocalStorage}
                      sectionId={section.id}
                      title={`${sectionIndex + 1}. ${section.title}`}
                      onClickSetCurrentVideoInfo={() => onSelectVideo(courseIndex, sectionIndex)} />
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default CoursesList;
