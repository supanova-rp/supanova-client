import { useState } from 'react';
import { Button } from 'react-bootstrap';

import { ServerSideCourse } from '@/index';

import FormGroup from '../FormGroup';
import Section from './Section';

interface Props {
  course: ServerSideCourse,
}

const EditCourseView: React.FC<Props> = ({ course }) => {
  const [courseTitleInputValue, setCourseTitleInputValue] = useState(course.course_title);
  const [courseDescriptionInputValue, setCourseDescriptionInputValue] = useState(course.description);

  return (
    <div className="mb-4">
      <FormGroup
        formId="course-title"
        value={courseTitleInputValue}
        label="Course Title"
        onChange={(e) => setCourseTitleInputValue(e.target.value)}
        type="text"
        className="mb-4" />
      <FormGroup
        formId="course-desription"
        value={courseDescriptionInputValue}
        label="Course Description"
        onChange={(e) => setCourseDescriptionInputValue(e.target.value)}
        type="text"
        className="mb-4" />
      {course.sections.map((section) => {
        return <Section key={section.section_id} section={section} />;
      })}

      <div className="mb-5">
        <Button className="edit-course-save-btn">Save</Button>
        <Button
          className="btn-danger"
          type="button">
          Delete course
        </Button>
      </div>

    </div>
  );
};

export default EditCourseView;
