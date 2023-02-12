import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import { ServerSideCourse } from '@/index';

import FormGroup from '../FormGroup';
import Section from './Section';

interface Props {
  course: ServerSideCourse,
  onClickHandleEditCourse: (parameter1: number, parameter2: boolean) => void,
}

const EditCourseView: React.FC<Props> = ({ course, onClickHandleEditCourse }) => {
  const [courseTitleInputValue, setCourseTitleInputValue] = useState(course.title);
  const [courseDescriptionInputValue, setCourseDescriptionInputValue] = useState(course.description);

  return (
    <Form className="mb-4">
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
      {course.sections.map((section, index) => {
        return <Section key={section.id} section={section} index={index} />;
      })}

      <div className="mb-5">
        <Button className="edit-course-save-btn" type="submit">Save</Button>
        <Button
          className="btn-danger"
          type="button"
          onClick={() => onClickHandleEditCourse(course.id, false)}>
          Cancel
        </Button>
      </div>

    </Form>
  );
};

export default EditCourseView;
