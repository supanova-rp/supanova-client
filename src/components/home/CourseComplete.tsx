import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Course } from "src/types";

import CongratulationsImage from "../../assets/images/congratulations.png";
import Card from "../Card";

interface Props {
  course: Course;
}

export const CourseComplete: React.FC<Props> = ({ course }) => {
  const navigate = useNavigate();

  const { completionTitle, completionMessage } = course;

  const onClickBack = () => {
    navigate("/");
  };

  return (
    <div className="course-complete">
      <Card className="course-complete-card animate-in">
        <h3 className="completion-title">{completionTitle}</h3>

        <img
          src={CongratulationsImage}
          alt="Congratulations"
          className="congratulations-image"
        />

        <h5 className="completion-message">{completionMessage}</h5>

        <Button onClick={onClickBack} className="btn btn-primary mt-3">
          Back to all courses
        </Button>
      </Card>
    </div>
  );
};
