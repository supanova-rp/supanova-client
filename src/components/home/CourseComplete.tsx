import React from "react";

interface Props {
  pdfUrl: string
}

export const CourseComplete: React.FC<Props> = ({ pdfUrl }) => {
  return (
    <div>
      Course Complete!

      {/* TODO: add View button also */}

      <a href={pdfUrl}>
        Download Certificate
      </a>
    </div>
  );
};
