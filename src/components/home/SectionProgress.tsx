import { SectionProgressState } from "src/types";

import CheckMark from "../../assets/icons/checkIcon.svg?react";
import PadlockIcon from "../../assets/icons/padlock.svg?react";
import HalfFullCircle from "../HalfFullCircle";

interface Props {
  sectionProgressState: SectionProgressState;
}

const SectionProgress: React.FC<Props> = ({ sectionProgressState }) => {
  const renderContent = () => {
    if (sectionProgressState === SectionProgressState.Completed) {
      return (
        <div className="progress-circle full-circle d-flex align-items-center justify-content-center">
          <CheckMark stroke="white" />
        </div>
      );
    }

    if (sectionProgressState === SectionProgressState.Current) {
      return <HalfFullCircle />;
    }

    if (sectionProgressState === SectionProgressState.Locked) {
      return (
        <div className="progress-circle full-circle d-flex align-items-center justify-content-center">
          <PadlockIcon width={12} height={12} fill="white" />
        </div>
      );
    }

    // SectionProgressState.Empty
    return (
      <div className="progress-circle empty-circle d-flex align-items-center justify-content-center" />
    );
  };

  return (
    <div className="d-flex justify-content-center progress-circle-container align-items-center">
      {renderContent()}
    </div>
  );
};

export default SectionProgress;
