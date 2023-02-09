import { curriculumData } from '@/constants/curriculumData';
import { LogoutErrorProps } from '@/index';

import Header from './Header';
import TableRow from './TableRow';

interface Props extends LogoutErrorProps {
  setShowVideo: (parameter: boolean) => void,
}

const CoursesList: React.FC<Props> = ({ logoutError, setShowVideo }) => {
  return (
    <>
      <div>
        <Header title="Course Curriculum" logoutError={logoutError} />
      </div>
      <div>
        {curriculumData.map((course, index) => {
          return (
            <div key={`${course.courseTitle} ${course.id}`}>
              <h5>{`${index + 1}. ${course.courseTitle}`}</h5>
              <p>{course.description}</p>
              <table className="table table-bordered mt-4">
                <tbody>
                  {course.sections.map((section, index) => {
                    return (
                      <TableRow
                        key={section.id}
                        title={`${index + 1}. ${section.title}`}
                        videoLength={section.videoLength}
                        setShowVideo={setShowVideo} />
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
