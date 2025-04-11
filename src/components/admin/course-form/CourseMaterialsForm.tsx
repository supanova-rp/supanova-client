import { AxiosProgressEvent } from "axios";
import React from "react";
import AddMoreInputs from "src/components/AddMoreInputs";
import { CourseMaterial, ID } from "src/types";

import CourseMaterialForm from "./CourseMaterialForm";

interface Props {
  materials: CourseMaterial[];
  courseId: ID;
  onChangeMaterialName: (id: ID, name: string) => void;
  onClickAddCourseMaterial: () => void;
  onCourseMaterialUploadProgress: (data: AxiosProgressEvent, id: ID) => void;
  onCourseMaterialUploadCancelled: (id: ID) => void;
  onChangeMaterialStorageKey: (materialID: ID, storageKey: ID) => void;
  handleRemoveMaterial: (id: ID) => void;
}

export const CourseMaterialsForm: React.FC<Props> = ({
  materials,
  courseId,
  onChangeMaterialName,
  onClickAddCourseMaterial,
  onCourseMaterialUploadProgress,
  onCourseMaterialUploadCancelled,
  onChangeMaterialStorageKey,
  handleRemoveMaterial,
}) => {
  return (
    <div>
      <h4 className="mb-4 pt-2">Course Materials</h4>

      {materials?.length
        ? materials.map(material => {
            return (
              <CourseMaterialForm
                key={material.id}
                material={material}
                courseId={courseId}
                onChangeMaterialName={onChangeMaterialName}
                onCourseMaterialUploadProgress={onCourseMaterialUploadProgress}
                onCourseMaterialUploadCancelled={
                  onCourseMaterialUploadCancelled
                }
                onChangeMaterialStorageKey={onChangeMaterialStorageKey}
                handleRemoveMaterial={handleRemoveMaterial}
              />
            );
          })
        : null}

      <AddMoreInputs
        title="Add course material"
        onClick={onClickAddCourseMaterial}
      />
    </div>
  );
};
