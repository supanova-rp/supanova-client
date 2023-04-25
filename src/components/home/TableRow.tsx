import { Button } from "react-bootstrap";

import { ReactComponent as VideoIcon } from "../../icons/videoIcon.svg";
import { colors } from "../../constants/colorPalette";

import SectionProgress from "./SectionProgress";

interface Props {
  title: string,
  sectionId: number,
  onClickSetCurrentVideoInfo: React.MouseEventHandler<HTMLButtonElement>,
  completed?: boolean,
}

const TableRow: React.FC<Props> = ({ title, sectionId, completed, onClickSetCurrentVideoInfo }) => {
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
          onClick={onClickSetCurrentVideoInfo}>
          {renderSectionProgressCircle()}
          <div className="d-flex align-items-center">
            <VideoIcon
              stroke={colors.darkgray}
              className="mx-3" />
            <p className="mb-0 text-secondary me-1">{title}</p>
          </div>
        </Button>
      </td>
    </tr>
  );
};

export default TableRow;
