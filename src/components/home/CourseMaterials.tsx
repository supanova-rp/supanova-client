import React from "react";
import { CourseMaterialViewModel } from "src/types";

import DownloadLink from "../DownloadLink";

interface Props {
  materials: CourseMaterialViewModel[];
  headerType?: "small" | "normal";
}

export const CourseMaterials: React.FC<Props> = ({
  materials,
  headerType = "normal",
}) => {
  if (materials?.length === 0) {
    return null;
  }

  return (
    <div>
      <header className="d-flex flex-column">
        {headerType === "small" ? (
          <h5 className="mb-3">Course materials</h5>
        ) : (
          <h4 className="mb-3">Course materials</h4>
        )}
      </header>

      {materials?.map(material => {
        return (
          <div key={material.id}>
            <DownloadLink url={material.url} name={material.name} />
          </div>
        );
      })}
    </div>
  );
};
