import { AxiosProgressEvent } from "axios";
import React from "react";
import AddMoreInputs from "src/components/AddMoreInputs";
import { CourseMaterial as CourseMaterialType, ID } from "src/types";

import CourseMaterial from "./CourseMaterial";

interface Props {
  materials: CourseMaterialType[];
  courseId: ID;
  onChangeMaterialName: (id: ID, name: string) => void;
  onClickAddCourseMaterial: () => void;
  onCourseMaterialUploaded: (id: ID, videoUrl: string) => void;
  onCourseMaterialUploadProgress: (data: AxiosProgressEvent, id: ID) => void;
  onCourseMaterialUploadCancelled: (id: ID) => void;
  handleRemoveMaterial: (id: ID) => void;
}

export const CourseMaterials: React.FC<Props> = ({
  materials,
  courseId,
  onChangeMaterialName,
  onClickAddCourseMaterial,
  onCourseMaterialUploaded,
  onCourseMaterialUploadProgress,
  onCourseMaterialUploadCancelled,
  handleRemoveMaterial,
}) => {
  return (
    <div>
      <AddMoreInputs
        title="Add course material"
        onClick={onClickAddCourseMaterial}
      />

      {materials.map(material => {
        return (
          <CourseMaterial
            key={material.id}
            material={material}
            courseId={courseId}
            onChangeMaterialName={onChangeMaterialName}
            onCourseMaterialUploaded={onCourseMaterialUploaded}
            onCourseMaterialUploadProgress={onCourseMaterialUploadProgress}
            onCourseMaterialUploadCancelled={onCourseMaterialUploadCancelled}
            handleRemoveMaterial={handleRemoveMaterial}
          />
        );
      })}
    </div>
  );
};
