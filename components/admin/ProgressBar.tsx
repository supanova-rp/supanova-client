import { CircularProgressbar } from 'react-circular-progressbar';

interface Props {
  value: number,
}

const ProgressBar: React.FC<Props> = ({ value }) => {
  return (
    <div className="progress-bar-container">
      <CircularProgressbar
        value={value * 100}
        text={`${Math.round(value * 100)}%`}
        className="progress-bar" />
    </div>
  );
};

export default ProgressBar;
