/* eslint-disable jsx-a11y/media-has-caption */
import { ServerSideSection } from '@/index';

interface Props {
  section: ServerSideSection
}

const Section: React.FC<Props> = ({ section }) => {
  return (
    <div>
      <h6 className="mb-0">{section.section_title}</h6>
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
