import { ServerSideCourse } from '@/index';
import { colors } from '@/constants/colorPalette';

import EditIcon from '@/icons/editIcon.svg';
import DeleteIcon from '@/icons/deleteIcon.svg';

import Section from './Section';

interface Props {
  course: ServerSideCourse,
  onClickHandleEditCourse: (parameter1: number, parameter2: boolean) => void,
  index: number,
}

const CourseListView: React.FC<Props> = ({ course, onClickHandleEditCourse, index }) => {
  return (
    <div className="my-4">
      <div className="d-flex align-items-center mb-2">
        <h4 className="m-0">{`${index + 1}. ${course.title}`}</h4>
        <EditIcon
          stroke={colors.darkgray}
          onClick={() => onClickHandleEditCourse(course.id, true)}
          className="clickable ms-2" />
        <DeleteIcon stroke={colors.darkgray} className="clickable ms-2" />
      </div>
      <p>{course.description}</p>
      {course.sections.map((section, sectionIndex) => {
        return <Section key={section.id} section={section} index={sectionIndex} />;
      })}
    </div>
  );
};

export default CourseListView;
