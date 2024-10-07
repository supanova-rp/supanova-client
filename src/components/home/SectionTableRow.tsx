import { Button } from "react-bootstrap";
import QuizIcon from "src/assets/icons/quizIcon.svg?react";
import VideoIcon from "src/assets/icons/videoIcon.svg?react";
import { SectionProgressState } from "src/types";

import SectionProgress from "./SectionProgress";
import { colors } from "../../constants/colorPalette";

interface Props {
  title: string;
  isVideoSection: boolean;
  sectionProgressState: SectionProgressState;
  onClickFunc: React.MouseEventHandler<HTMLButtonElement>;
}

const SectionTableRow: React.FC<Props> = ({
  title,
  isVideoSection,
  sectionProgressState,
  onClickFunc,
}) => {
  return (
    <tr>
      <td className="section-row-data">
        <Button
          className="d-flex align-items-center w-100 rounded-0 btn-light row-buttons"
          onClick={onClickFunc}
        >
          <SectionProgress sectionProgressState={sectionProgressState} />
          <div className="d-flex align-items-center icon-and-description">
            <div>
              {isVideoSection ? (
                <VideoIcon
                  height="20"
                  width="20"
                  stroke={colors.darkgrey}
                  className="mx-3"
                />
              ) : (
                <QuizIcon
                  height="20"
                  width="20"
                  fill={colors.darkgrey}
                  style={{ marginBottom: "2px" }}
                  className="mx-3"
                />
              )}
            </div>
            <span className="mb-0 text-secondary me-1 description">
              {title}
            </span>
          </div>
        </Button>
      </td>
    </tr>
  );
};

export default SectionTableRow;
