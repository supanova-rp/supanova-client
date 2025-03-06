import { AxiosProgressEvent } from "axios";
import React from "react";
import FormInput from "src/components/FormInput";
import RemoveInput from "src/components/RemoveInput";
import Row from "src/components/Row";
import { useFileUpload } from "src/hooks/useFileUpload";

import FilePicker from "./FilePicker";
import {
  CourseMaterial as CourseMaterialType,
  FileUploadType,
  ID,
} from "../../../types/index";

interface Props {
  material: CourseMaterialType;
  courseId: ID;
  onChangeMaterialName: (id: ID, value: string) => void;
  onCourseMaterialUploaded: (id: ID, videoUrl: string) => void;
  onCourseMaterialUploadProgress: (data: AxiosProgressEvent, id: ID) => void;
  onCourseMaterialUploadCancelled: (id: ID) => void;
  handleRemoveMaterial: (sectionId: ID) => void;
}

const CourseMaterial: React.FC<Props> = ({
  material,
  courseId,
  onChangeMaterialName,
  onCourseMaterialUploaded,
  onCourseMaterialUploadProgress,
  onCourseMaterialUploadCancelled,
  handleRemoveMaterial,
}) => {
  const { id, name, uploadProgress } = material;

  const {
    abortController,
    fileInputRef,
    handleFileUploaded,
    handleCancelFileUpload,
    cancelUploadRequest,
  } = useFileUpload(
    id,
    uploadProgress,
    onCourseMaterialUploaded,
    onCourseMaterialUploadCancelled,
  );

  const onClickRemove = () => {
    cancelUploadRequest();

    handleRemoveMaterial(id);
  };

  return (
    <Row>
      <FormInput
        formId={`course-material-${id}`}
        formGroupClassname="my-4 section-input"
        label="Course material name"
        type="text"
        value={name}
        onChange={e => onChangeMaterialName(id, e.target.value)}
        Component={
          <FilePicker
            fileId={id}
            courseId={courseId}
            fileType={FileUploadType.Material}
            abortController={abortController}
            fileInputRef={fileInputRef}
            onFileUploaded={handleFileUploaded}
            onFileUploadProgress={onCourseMaterialUploadProgress}
            uploadProgress={uploadProgress}
            onClickCancelFileUpload={handleCancelFileUpload}
          />
        }
      />

      <RemoveInput onClickFunction={onClickRemove} />
    </Row>
  );
};

export default CourseMaterial;
