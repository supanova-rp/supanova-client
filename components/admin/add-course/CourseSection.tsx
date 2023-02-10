import React, { useRef } from 'react';
import { AxiosProgressEvent } from 'axios';

import { InputChangeEvent, Section } from '@/index';

import FilePicker from './FilePicker';
import FormGroup from '../FormGroup';
import RemoveUserInput from '../RemoveUser';

interface Props {
  index: number,
  section: Section,
  onChangeSection: (parameter1: string, parameter2: InputChangeEvent) => void,
  onFileSelected: (parameter1: string, parameter2: string) => void,
  onFileUploaded: (parameter1: string, parameter2: string) => void,
  onFileUploadProgress: (parameter1: AxiosProgressEvent, parameter2: string) => void,
  onUpdateStateAfterCancellingFileUpload: (paramater: string) => void,
  handleRemoveSection: (parameter: string) => void,
}

const CourseSection: React.FC<Props> = ({
  index,
  section,
  onChangeSection,
  onFileSelected,
  onFileUploaded,
  onFileUploadProgress,
  onUpdateStateAfterCancellingFileUpload,
  handleRemoveSection,
}) => {
  const abortControllerRef = useRef<AbortController>(new AbortController());

  const cancelUploadRequest = () => {
    abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();
  };

  const onClickCancelFileUpload = () => {
    cancelUploadRequest();
    onUpdateStateAfterCancellingFileUpload(section.id);
  };

  const onClickRemoveSection = () => {
    cancelUploadRequest();
    handleRemoveSection(section.id);
  };

  return (
    <div className="d-flex align-items-center" key={`chapter-${index}`}>
      <div>
        <FormGroup
          formId="course-section"
          className="my-4 chapter-input"
          label="Course Section"
          type="text"
          value={section.title}
          onChange={(e) => onChangeSection(section.id, e)}
          Component={(
            <FilePicker
              sectionId={section.id}
              videoName={section.video.name}
              abortControllerRef={abortControllerRef}
              onFileSelected={onFileSelected}
              onFileUploaded={onFileUploaded}
              onFileUploadProgress={onFileUploadProgress}
              uploadProgress={section.video.uploadProgress}
              onClickCancelFileUpload={onClickCancelFileUpload} />
          )} />
      </div>
      <div>

        {index !== 0
          ? <RemoveUserInput onClickFunction={onClickRemoveSection} />
          : null
        }

      </div>
    </div>
  );
};

export default CourseSection;
