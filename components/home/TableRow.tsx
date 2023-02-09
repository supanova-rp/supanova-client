import { Button } from 'react-bootstrap';

import VideoIcon from '@/icons/videoIcon.svg';
import { colors } from '@/constants/colorPalette';
import EmptyCircle from './EmptyCircle';

interface Props {
  title: string,
  videoLength: string,
  setShowVideo: (parameter: boolean) => void,
}

const TableRow: React.FC<Props> = ({ title, videoLength, setShowVideo }) => {
  return (
    <tr>
      <Button className="d-flex align-items-center w-100 rounded-0 btn-light row-buttons" onClick={() => setShowVideo(true)}>
        <th className="table-header"><EmptyCircle /></th>
        <td>
          <div className="d-flex align-items-center">
            <VideoIcon stroke={colors.gray} className="mx-3" />
            <p className="mb-0 text-secondary me-1">{title}</p>
            <p className="mb-0 text-secondary">{`(${videoLength})`}</p>
          </div>
        </td>
      </Button>
    </tr>
  );
};

export default TableRow;
