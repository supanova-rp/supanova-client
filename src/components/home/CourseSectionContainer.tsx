import { ChangeDirection } from "src/types";

import { PropsWithChildren } from "react";
import { Button } from "react-bootstrap";
import Header from "./Header";

interface Props extends PropsWithChildren {
  canGoBack: boolean,
  courseTitle: string,
  continueText?: string,
  onChangeSection: (direction: ChangeDirection) => void,
  onClickContinue?: () => void,
  onCourseComplete?: () => void,
  onClickBackChevron: () => void,
}

const CourseSectionContainer : React.FC<Props> = ({
  children,
  courseTitle,
  continueText = "Continue",
  canGoBack,
  onChangeSection,
  onClickContinue,
  onClickBackChevron
}) => {
  const handleClickContinue = () => {
    if (onClickContinue) {
      onClickContinue();
    } else {
      onChangeSection("next");
    }
  };

  const renderDirectionButtons = () => {
    if (canGoBack) {
      return (
        <div>
          <Button
            onClick={() => onChangeSection("prev")}
            type="button"
            className="me-4 main-button">
            Back
          </Button>

          <Button
            onClick={handleClickContinue}
            type="button"
            className="main-button">
            {continueText}
          </Button>
        </div>
      );
    }

    return (
      <Button
        onClick={handleClickContinue}
        type="button"
        className="main-button">
        {continueText}
      </Button>
    );
  };

  return (
    <div>
      <Header
        className="default-header"
        title={courseTitle}
        onClickBack={onClickBackChevron} />
      {children}
      {renderDirectionButtons()}
    </div>
  );
};

export default CourseSectionContainer;