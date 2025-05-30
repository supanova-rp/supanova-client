import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { colors } from "src/constants/colorPalette";
import { Course } from "src/types";

import CongratulationsImage from "../../assets/images/congratulations.png";
import Card from "../Card";

interface Props {
  course: Course;
  error: boolean;
  loading: boolean;
  onPressTryAgain: () => void;
}

export const CourseComplete: React.FC<Props> = ({
  course,
  error,
  loading,
  onPressTryAgain,
}) => {
  const navigate = useNavigate();

  const { completionTitle, completionMessage } = course;

  const onClickBack = () => {
    navigate("/");
  };

  return (
    <div className="course-complete">
      {loading ? <PulseLoader color={colors.orange} className="m-5" /> : null}

      {error ? (
        <Card className="animate-in mb-3 content-card-compact card-warning">
          <p>
            You have completed the course but there was an error saving this
            information. Please try this again by pressing the button below, if
            this message doesn&apos;t go away then please contact your
            instructor to let them know you have completed the course
          </p>

          <Button onClick={onPressTryAgain} className="btn btn-primary">
            Try Again
          </Button>
        </Card>
      ) : null}

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
