import { Button } from "react-bootstrap";

import { ReactComponent as VideoIcon } from "src/icons/videoIcon.svg";
import { ReactComponent as QuizIcon } from "src/icons/quizIcon.svg";
import { colors } from "../../constants/colorPalette";

import SectionProgress from "./SectionProgress";

interface Props {
  title: string,
  sectionId: number,
  isVideoSection: boolean,
  onClickFunc: React.MouseEventHandler<HTMLButtonElement>,
  completed?: boolean,
}

const SectionTableRow: React.FC<Props> = ({
  title,
  sectionId,
  completed,
  isVideoSection,
  onClickFunc
}) => {
  const renderSectionProgressCircle = () => {
    if (completed || JSON.parse(localStorage.getItem(`section-progress-${sectionId}`) || "{}").completed) {
      return <SectionProgress className="full-circle" />;
    }

    return <SectionProgress className="empty-circle" />;
  };

  return (
    <tr>
      <td className="section-row-data">
        <Button
          className="d-flex align-items-center w-100 rounded-0 btn-light row-buttons"
          onClick={onClickFunc}>
          {renderSectionProgressCircle()}
          <div className="d-flex align-items-center">
            {isVideoSection
              ? (
                <VideoIcon
                  stroke={colors.darkgrey}
                  className="mx-3" />
              )
              : (
                <QuizIcon
                  fill={colors.darkgrey}
                  className="mx-3" />
              )
            }
            <p className="mb-0 text-secondary me-1">{title}</p>
          </div>
        </Button>
      </td>
    </tr>
  );
};

export default SectionTableRow;
