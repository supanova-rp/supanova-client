import { Button } from 'react-bootstrap';

import { ServerSideCourse } from '@/index';
import { colors } from '@/constants/colorPalette';

import EditIcon from '@/icons/editIcon.svg';

import Section from './Section';

interface Props {
  course: ServerSideCourse,
  onClickStartEditingCourse: (parameter: number) => void,
  index: number,
}

const CourseListView: React.FC<Props> = ({ course, onClickStartEditingCourse, index }) => {
  return (
    <div className="my-4">
      <div className="d-flex align-items-center mb-2">
        <h4 className="m-0">{`${index + 1}. ${course.course_title}`}</h4>
        <EditIcon
          stroke={colors.darkgray}
          onClick={() => onClickStartEditingCourse(course.course_id)}
          className="clickable ms-2" />
      </div>
      <p>{course.description}</p>
      {course.sections.map((section) => {
        return <Section key={section.section_id} section={section} />;
      })}
    </div>
  );
};

export default CourseListView;
