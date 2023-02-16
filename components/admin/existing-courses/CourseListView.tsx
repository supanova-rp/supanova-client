import { Course, CourseSection } from '@/index';
import { colors } from '@/constants/colorPalette';

import EditIcon from '@/icons/editIcon.svg';
import DeleteIcon from '@/icons/deleteIcon.svg';

import Section from './Section';

interface Props {
  index: number,
  course: Course,
  onClickHandleShowingDeleteOverlay: (paramater: boolean) => void,
  onClickStartEditingCourse: (parameter1: number, parameter2: boolean) => void,
}

const CourseListView: React.FC<Props> = ({
  course,
  onClickHandleShowingDeleteOverlay,
  onClickStartEditingCourse,
  index,
}) => {
  return (
    <div className="my-4">
      <div className="d-flex align-items-center mb-2">
        <h4 className="m-0">{`${index + 1}. ${course.title}`}</h4>
        <EditIcon
          stroke={colors.darkgray}
          onClick={() => onClickStartEditingCourse(course.id, true)}
          className="clickable ms-2" />
        <DeleteIcon
          stroke={colors.darkgray}
          className="clickable ms-2"
          onClick={() => onClickHandleShowingDeleteOverlay(true)} />
      </div>
      <p>{course.description}</p>
      {course.sections.map((section: CourseSection, sectionIndex: number) => {
        return <Section key={section.id} section={section} index={sectionIndex} />;
      })}
    </div>
  );
};

export default CourseListView;
