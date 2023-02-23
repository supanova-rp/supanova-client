import { Course, CourseSection } from '@/index';
import { colors } from '@/constants/colorPalette';

import EditIcon from '@/icons/editIcon.svg';
import DeleteIcon from '@/icons/deleteIcon.svg';

import SectionView from './SectionView';

interface Props {
  index: number,
  course: Course,
  onClickStartEditingCourse: (parameter1: number, parameter2: boolean) => void,
  onClickHandleShowingDeleteOverlay: (parameter: number | null) => void,
}

const CourseListView: React.FC<Props> = ({
  course,
  index,
  onClickStartEditingCourse,
  onClickHandleShowingDeleteOverlay,
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
          onClick={() => onClickHandleShowingDeleteOverlay(course.id)} />
      </div>
      <p className="mb-4">{course.description}</p>
      {course.sections.map((section: CourseSection, sectionIndex: number) => {
        return (
          <SectionView key={section.id} index={sectionIndex} section={section} />
        );
      })}
    </div>
  );
};

export default CourseListView;
