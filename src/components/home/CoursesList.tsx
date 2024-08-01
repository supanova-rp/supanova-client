import SectionTableRow from "./SectionTableRow";
import { Course } from "../../types/index";
import { isVideoSection } from "../admin/course-form/utils";

interface CoursesListProps {
  courses: Course[];
  onSelectVideo: (courseIndex: number, sectionIndex: number) => void;
  onSelectQuiz: (courseIndex: number, sectionIndex: number) => void;
}

const CoursesList: React.FC<CoursesListProps> = ({
  courses,
  onSelectVideo,
  onSelectQuiz,
}) => {
  return (
    <div className="px-3 pt-2">
      {courses.map((course, courseIndex) => {
        return (
          <div key={`${course.title} ${course.id}`} className="mb-5">
            <h5>{`${courseIndex + 1}. ${course.title}`}</h5>
            <p className="mt-3 mb-4">{course.description}</p>
            <table className="table table-bordered mt-3">
              <tbody>
                {course.sections.map((section, sectionIndex) => {
                  const sectionId =
                    courses[courseIndex].sections[sectionIndex].id;
                  const isCompletedInLocalStorage = JSON.parse(
                    localStorage.getItem(`section-progress-${sectionId}`) ||
                      "{}",
                  ).completed;

                  return (
                    <SectionTableRow
                      key={section.id}
                      completed={section.completed || isCompletedInLocalStorage}
                      isVideoSection={isVideoSection(section)}
                      sectionId={section.id}
                      title={
                        isVideoSection(section)
                          ? `${sectionIndex + 1}. ${section.title}`
                          : `${sectionIndex + 1}. Quiz`
                      }
                      onClickFunc={
                        isVideoSection(section)
                          ? () => onSelectVideo(courseIndex, sectionIndex)
                          : () => onSelectQuiz(courseIndex, sectionIndex)
                      }
                    />
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
