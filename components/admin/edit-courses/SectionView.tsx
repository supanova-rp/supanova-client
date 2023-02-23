/* eslint-disable jsx-a11y/media-has-caption */
import { CourseSection } from '@/index';

interface Props {
  section: CourseSection,
  index: number,
}

const SectionView: React.FC<Props> = ({
  index,
  section,
}) => {
  return (
    <div>
      <h6 className="mb-0">{`${index + 1}. ${section.title}`}</h6>
      {section.videoUrl
        ? (
          <video
            id="my-player"
            className="video-js-edit my-4"
            controls
            preload="auto"
            src={section.videoUrl} />
        )
        : null
      }

    </div>
  );
};

export default SectionView;
