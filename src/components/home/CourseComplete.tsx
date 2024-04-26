import React from "react";
import Header from "./Header";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface Props {
  pdfUrl: string
}

export const CourseComplete: React.FC<Props> = ({ pdfUrl }) => {
  const navigate = useNavigate();

  const onClickBack = () => {
    navigate("/");
  };

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

      <Button
        onClick={onClickBack}
        className="btn btn-primary mt-3">
        Back to all courses
      </Button>
    </div>
  );
};
