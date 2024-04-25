import React from "react";
import Header from "./Header";

interface Props {
  pdfUrl: string
}

export const CourseComplete: React.FC<Props> = ({ pdfUrl }) => {
  return (
    <div>
      <Header
        className="default-header"
        title="Course Complete!" />

      <h5>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer">
          View Certificate
        </a>
      </h5>
    </div>
  );
};
