import { AxiosProgressEvent } from 'axios';
import { Form } from 'react-bootstrap';

import { ServerSideCourse } from '@/index';

import FormGroup from '../FormGroup';
import Section from './Section';

interface Props {
  course: ServerSideCourse,
  onChangeCourseField: (paramter1: number, parameter2: string, parameter3: string) => void,
  onChangeSectionTitleField: (parameter1: number, parameter2: string) => void,
  onFileUploaded: (parameter1: number, parameter2: string) => void,
  onFileUploadProgress: (parameter1: AxiosProgressEvent, parameter2: number) => void,
  onUpdateStateAfterCancellingFileUpload: (parameter: number) => void,
  handleRemoveSection: (parameter: number) => void,
}

const EditCourseView: React.FC<Props> = ({
  course,
  onChangeCourseField,
  onChangeSectionTitleField,
  onFileUploaded,
  onFileUploadProgress,
  onUpdateStateAfterCancellingFileUpload,
  handleRemoveSection,
}) => {
  return (
    <Form className="mb-4">
      <FormGroup
        formId="course-title"
        value={course.title}
        label="Course Title"
        onChange={(e) => onChangeCourseField(course.id, 'title', e.target.value)}
        type="text"
        className="mb-4" />
      <FormGroup
        formId="course-desription"
        value={course.description}
        label="Course Description"
        onChange={(e) => onChangeCourseField(course.id, 'description', e.target.value)}
        type="text"
        className="mb-4" />
      {course.sections.map((section, sectionIndex) => {
        return (
          <Section
            key={section.id}
            index={sectionIndex}
            section={section}
            isEditing={course.isEditing}
            onChangeSectionTitleField={onChangeSectionTitleField}
            onFileUploaded={onFileUploaded}
            onFileUploadProgress={onFileUploadProgress}
            onUpdateStateAfterCancellingFileUpload={onUpdateStateAfterCancellingFileUpload}
            handleRemoveSection={handleRemoveSection} />
        );
      })}
    </Form>
  );
};

export default EditCourseView;
