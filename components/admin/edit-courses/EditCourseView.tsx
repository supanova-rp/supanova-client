import { AxiosProgressEvent } from 'axios';

import { Course } from '@/index';

import FormGroup from '../FormGroup';
import EditSection from '../EditSection';

interface Props {
  course: Course,
  onChangeCourseField: (paramter1: number, parameter2: string, parameter3: string) => void,
  onChangeSectionTitle: (parameter1: number, parameter2: string) => void,
  onFileUploaded: (parameter1: number, parameter2: string) => void,
  onFileUploadProgress: (parameter1: AxiosProgressEvent, parameter2: number) => void,
  onUpdateStateAfterCancellingFileUpload: (parameter: number) => void,
  handleRemoveSection: (parameter: number) => void,
}

const EditCourseView: React.FC<Props> = ({
  course,
  onChangeCourseField,
  onChangeSectionTitle,
  onFileUploaded,
  onFileUploadProgress,
  onUpdateStateAfterCancellingFileUpload,
  handleRemoveSection,
}) => {
  return (
    <div className="mb-4">
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
          <EditSection
            key={section.id}
            index={sectionIndex}
            section={section}
            canRemove={course.sections.length > 1}
            onChangeSectionTitle={onChangeSectionTitle}
            onFileUploaded={onFileUploaded}
            onFileUploadProgress={onFileUploadProgress}
            onUpdateStateAfterCancellingFileUpload={onUpdateStateAfterCancellingFileUpload}
            handleRemoveSection={handleRemoveSection} />
        );
      })}
    </div>
  );
};

export default EditCourseView;
