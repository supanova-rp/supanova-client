import { AxiosProgressEvent } from "axios";

import { Course } from "../../../types/index";

import FormGroup from "../FormGroup";
import EditSection from "../EditSection";

interface Props {
  course: Course,
  onChangeCourseField: (key: string, newInputValue: string) => void,
  onChangeSectionTitle: (sectionId: number, newInputValue: string) => void,
  onFileUploaded: (sectionId: number, videoUrl: string) => void,
  onFileUploadProgress: (data: AxiosProgressEvent, sectionId: number) => void,
  onUpdateStateAfterCancellingFileUpload: (sectionId: number) => void,
  handleRemoveSection: (sectionId: number) => void,
}

const CourseForm: React.FC<Props> = ({
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
        onChange={(e) => onChangeCourseField("title", e.target.value)}
        type="text"
        className="mb-4" />
      <FormGroup
        formId="course-desription"
        value={course.description}
        label="Course Description"
        onChange={(e) => onChangeCourseField("description", e.target.value)}
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

export default CourseForm;
