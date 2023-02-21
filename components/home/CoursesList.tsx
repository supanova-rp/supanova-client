import { LogoutErrorProps, Course } from '@/index';

import Header from './Header';
import TableRow from './TableRow';

interface Props extends LogoutErrorProps {
  allCourses: Course[],
  logoutError: string,
  onSelectVideo: (parameter1: number, parameter2: number) => void,
}

// TODO: fix table styling (borders left and right missing)

const CoursesList: React.FC<Props> = ({ logoutError, allCourses, onSelectVideo }) => {
  return (
    <>
      <div>
        <Header title="All Courses" logoutError={logoutError} />
      </div>
      <div>
        {allCourses.map((course, courseIndex) => {
          return (
            <div key={`${course.title} ${course.id}`}>
              <h5>{`${courseIndex + 1}. ${course.title}`}</h5>
              <p>{course.description}</p>
              <table className="table table-bordered mt-4">
                <tbody>
                  {course.sections.map((section, sectionIndex) => {
                    return (
                      <TableRow
                        key={section.id}
                        completed={section.completed}
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
    </>
  );
};

export default CoursesList;
