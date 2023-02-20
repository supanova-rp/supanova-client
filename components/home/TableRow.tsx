import { Button } from 'react-bootstrap';

import VideoIcon from '@/icons/videoIcon.svg';
import { colors } from '@/constants/colorPalette';

import SectionProgress from './SectionProgress';

interface Props {
  title: string,
  onClickSetCurrentVideoInfo: React.MouseEventHandler<HTMLButtonElement>,
  completed?: boolean,
}

const TableRow: React.FC<Props> = ({ title, completed, onClickSetCurrentVideoInfo }) => {
  return (
    <tr>
      <Button
        className="d-flex align-items-center w-100 rounded-0 btn-light row-buttons"
        onClick={onClickSetCurrentVideoInfo}>
        <th className="table-header">
          {completed
            ? <SectionProgress className="full-circle" />
            : <SectionProgress className="empty-circle" />
          }
        </th>
        <td>
          <div className="d-flex align-items-center">
            <VideoIcon stroke={colors.gray} className="mx-3" />
            <p className="mb-0 text-secondary me-1">{title}</p>
          </div>
        </td>
      </Button>
    </tr>
  );
};

export default TableRow;
