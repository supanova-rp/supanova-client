/* eslint-disable jsx-a11y/media-has-caption */
import { ServerSideSection } from '@/index';

interface Props {
  section: ServerSideSection,
  index: number,
}

const Section: React.FC<Props> = ({ section, index }) => {
  return (
    <div>
      <h6 className="mb-0">{`${index + 1}. ${section.title}`}</h6>
      <video
        id="my-player"
        className="video-js-edit mb-4"
        controls
        preload="auto"
        // poster="//vjs.zencdn.net/v/oceans.png"
        src={section.video_url} />
    </div>
  );
};

export default Section;
