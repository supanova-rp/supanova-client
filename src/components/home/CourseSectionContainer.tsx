import { PropsWithChildren } from "react";
import { Button } from "react-bootstrap";
import { PulseLoader } from "react-spinners";
import { colors } from "src/constants/colorPalette";
import { ChangeDirection } from "src/types";

import Header from "./Header";

interface Props extends PropsWithChildren {
  canGoBack: boolean;
  courseTitle: string;
  continueText?: string;
  className?: string;
  loading?: boolean;
  error?: string;
  onChangeSection: (direction: ChangeDirection) => void;
  onClickContinue?: () => void;
  onCourseComplete?: () => void;
  onClickBackChevron: () => void;
}

const CourseSectionContainer: React.FC<Props> = ({
  children,
  courseTitle,
  continueText = "Continue",
  className = "",
  canGoBack,
  loading,
  error,
  onChangeSection,
  onClickContinue,
  onClickBackChevron,
}) => {
  const renderContinue = () => {
    if (loading) {
      return (
        <Button type="button" className="main-button continue-button" disabled>
          <PulseLoader color={colors.white} size={8} />
        </Button>
      );
    }

    return (
      <Button
        onClick={onClickContinue}
        type="button"
        className="main-button continue-button"
      >
        {continueText}
      </Button>
    );
  };

  const renderBack = () => {
    return (
      <Button
        onClick={() => onChangeSection("prev")}
        disabled={loading}
        type="button"
        className="me-4 main-button"
      >
        Back
      </Button>
    );
  };

  const renderDirectionButtons = () => {
    if (canGoBack) {
      return (
        <div>
          {renderBack()}
          {renderContinue()}
        </div>
      );
    }

    return renderContinue();
  };

  return (
    <div className={className}>
      <Header
        className="default-header"
        title={courseTitle}
        onClickBack={onClickBackChevron}
      />
      {children}
      {renderDirectionButtons()}
      {error ? <p className="continue-error">{error}</p> : null}
    </div>
  );
};

export default CourseSectionContainer;
