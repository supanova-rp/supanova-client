import { LogoutErrorProps, Course } from '@/index';

import Header from './Header';
import TableRow from './TableRow';

interface Props extends LogoutErrorProps {
  courses: Course[],
  onClickSetCurrentVideo: (parameter1: number, parameter2: string, parameter3: number, parameter4: string, parameter5: string) => void,
}

const CoursesList: React.FC<Props> = ({ logoutError, courses, onClickSetCurrentVideo }) => {
  return (
    <>
      <div>
        <Header title="All Courses" logoutError={logoutError} />
      </div>
      <div>
        {courses?.map((course, courseIndex) => {
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
                        title={`${sectionIndex + 1}. ${section.title}`}
                        onClickSetCurrentVideo={() => onClickSetCurrentVideo(courseIndex, course.title, sectionIndex, section.videoUrl, section.title)} />
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
