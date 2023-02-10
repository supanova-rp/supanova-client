import { ServerSideCourse } from '@/index';

import CourseListView from './CourseListView';
import EditCourseView from './EditCourseView';

interface Props {
  course: ServerSideCourse,
  onClickStartEditingCourse: (parameter: number) => void,
  index: number,
}

const Course: React.FC<Props> = ({ course, onClickStartEditingCourse, index }) => {
  if (course.isEditing) {
    return <EditCourseView course={course} />;
  }

  return <CourseListView course={course} onClickStartEditingCourse={onClickStartEditingCourse} index={index}/>;
};

export default Course;
