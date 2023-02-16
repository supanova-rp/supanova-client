import { useState } from 'react';

import { Course, CourseSection } from '@/index';
import { colors } from '@/constants/colorPalette';

import EditIcon from '@/icons/editIcon.svg';
import DeleteIcon from '@/icons/deleteIcon.svg';

import DeleteCourseOverlay from '@/components/overlays/DeleteCourseOverlay';
import Section from './Section';

interface Props {
  index: number,
  course: Course,
  isLoading: boolean,
  onClickStartEditingCourse: (parameter1: number, parameter2: boolean) => void,
  onClickDeleteCourse: (parameter: number) => void,
}

const CourseListView: React.FC<Props> = ({
  course,
  index,
  isLoading,
  onClickStartEditingCourse,
  onClickDeleteCourse,
}) => {
  const [showDeleteCourseOverlay, setShowDeleteCourseOverlay] = useState(false);

  const onClickHandleShowingDeleteOverlay = (value: boolean) => {
    setShowDeleteCourseOverlay(value);
  };

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

      {showDeleteCourseOverlay
        ? (
          <DeleteCourseOverlay
            courseId={course.id}
            isLoading={isLoading}
            onClickHandleShowingDeleteOverlay={onClickHandleShowingDeleteOverlay}
            onClickDeleteCourse={onClickDeleteCourse} />
        )
        : null
      }

    </div>
  );
};

export default CourseListView;
