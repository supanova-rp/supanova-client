import React from "react";
import { PulseLoader } from "react-spinners";
import { colors } from "src/constants/colorPalette";
import { feedbackMessages } from "src/constants/constants";
import { useQuery } from "src/hooks/useQuery";
import { CourseMaterialResponse, ID } from "src/types";

import DownloadLink from "../DownloadLink";
import ErrorCard from "../ErrorCard";

interface Props {
  courseId: ID;
}

export const CourseMaterials: React.FC<Props> = ({ courseId }) => {
  const {
    data: materials,
    loading,
    error,
    refetch,
  } = useQuery<CourseMaterialResponse[]>("/materials", {
    requestBody: {
      courseId,
    },
    defaultError: feedbackMessages.getMaterialsError,
  });

  if (loading) {
    return (
      <div>
        <PulseLoader color={colors.orange} className="m-5" />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorCard
        errorMessage="Error loading course materials"
        onClick={refetch}
      />
    );
  }

  if (materials?.length === 0) {
    return null;
  }

  return (
    <div>
      <header className="d-flex flex-column">
        <h4 className="mb-3 mt-3">Course materials</h4>
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
