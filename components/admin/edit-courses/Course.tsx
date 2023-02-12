import { ServerSideCourse } from '@/index';

import CourseListView from './CourseListView';
import EditCourseView from './EditCourseView';

interface Props {
  course: ServerSideCourse,
  onClickHandleEditCourse: (parameter1: number, parameter2: boolean) => void,
  index: number,
}

const Course: React.FC<Props> = ({ course, onClickHandleEditCourse, index }) => {
  if (course.isEditing) {
    return <EditCourseView course={course} onClickHandleEditCourse={onClickHandleEditCourse} />;
  }

  return <CourseListView course={course} onClickHandleEditCourse={onClickHandleEditCourse} index={index} />;
};

export default Course;
