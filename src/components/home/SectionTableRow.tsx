import { Button } from "react-bootstrap";
import IntroIcon from "src/assets/icons/book.svg?react";
import QuizIcon from "src/assets/icons/quizIcon.svg?react";
import VideoIcon from "src/assets/icons/videoIcon.svg?react";
import { SectionProgressState } from "src/types";

import SectionProgress from "./SectionProgress";
import { colors } from "../../constants/colorPalette";

interface Props {
  title: string;
  rowType: SectionTableRowTypes;
  sectionProgressState: SectionProgressState;
  onClickFunc: React.MouseEventHandler<HTMLButtonElement>;
}

export enum SectionTableRowTypes {
  Introduction = "Introduction",
  Video = "Video",
  Quiz = "Quiz",
}

const getIconFromType = (type: SectionTableRowTypes) => {
  if (type === SectionTableRowTypes.Video) {
    return (
      <VideoIcon
        height="20"
        width="20"
        stroke={colors.darkgrey}
        className="mx-3"
      />
    );
  }

  if (type === SectionTableRowTypes.Quiz) {
    return (
      <QuizIcon
        height="20"
        width="20"
        fill={colors.darkgrey}
        style={{ marginBottom: "2px" }}
        className="mx-3"
      />
    );
  }

  return (
    <IntroIcon
      height="20"
      width="20"
      stroke={colors.darkgrey}
      style={{ marginRight: "1.05rem", marginLeft: "0.95rem" }}
      // className="mx-3"
    />
  );
};

const SectionTableRow: React.FC<Props> = ({
  title,
  rowType,
  sectionProgressState,
  onClickFunc,
}) => {
  return (
    <tr>
      <td className="section-row-data">
        <Button
          disabled={sectionProgressState === SectionProgressState.Locked}
          className="d-flex align-items-center w-100 rounded-0 btn-light row-buttons"
          onClick={onClickFunc}
        >
          <SectionProgress sectionProgressState={sectionProgressState} />
          <div className="d-flex align-items-center icon-and-description">
            <div>{getIconFromType(rowType)}</div>
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
