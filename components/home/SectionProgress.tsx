
import CheckMark from '@/icons/checkIcon.svg';

interface Props {
  className: string
}

const SectionProgress: React.FC<Props> = ({ className }) => {
  return (
    // TODO: center the circle
    <div className="d-flex justify-content-center progress-circle-container align-items-center">
      {className.includes('full')
        ? (
          <div className={`progress-circle ${className} d-flex align-items-center justify-content-center`}>
            <CheckMark stroke="white" />
          </div>
        )
        : <div className={`progress-circle ${className}`} />
      }

    </div>
  );
};

export default SectionProgress;
