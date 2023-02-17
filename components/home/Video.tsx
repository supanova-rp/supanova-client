/* eslint-disable jsx-a11y/media-has-caption */
import { Dispatch } from 'react';
import { Button } from 'react-bootstrap';

import { colors } from '@/constants/colorPalette';
import ChevronLeft from '@/icons/chevronLeft.svg';

import { Course, CurrentVideo, LogoutErrorProps, VideoState } from '@/index';
import Header from './Header';

interface Props extends LogoutErrorProps {
  currentVideo: CurrentVideo,
  courses: Course[],
  setCurrentVideo: Dispatch<VideoState>
}

const Video: React.FC<Props> = ({ logoutError, currentVideo, courses, setCurrentVideo }) => {
  const renderCorrectButtons = () => {
    const currentCourse = courses[currentVideo.courseIndex].sections;

    if (currentVideo.sectionIndex + 1 === currentCourse.length) {
      return <Button onClickShowVideo={() => onClickShowVideo('prev')} type="button">Previous</Button>;
    }

    if (currentVideo.sectionIndex + 1 > 1 && currentVideo.sectionIndex + 1 < currentCourse.length) {
      return (
        <div>
          <Button onClickShowVideo={() => onClickShowVideo('prev')} type="button">Previous</Button>
          <Button onClickShowVideo={() => onClickShowVideo('next')} type="button">Next</Button>
        </div>
      );
    }

    return <Button type="button">Next</Button>;
  };

  return (
    <div className="ms-4">
      <div>
        {/* TODO: find a way to add margin on the chevron */}
        <div className="d-flex align-items-center">
          <div className="p-1 clickable">
            <ChevronLeft stroke={colors.orange} className="mt-3 me-1" onClick={() => setCurrentVideo(null)} />
          </div>
          <Header title={currentVideo.courseTitle} logoutError={logoutError} />
        </div>
        <h5 className="mt-2 mb-4">{`${currentVideo.sectionIndex + 1}. ${currentVideo.sectionTitle}`}</h5>
        <video
          id="my-player"
          className="video-js-home"
          controls
          preload="auto"
          data-setup="{}">
          <source src={currentVideo.videoUrl} type="video/mp4" />
        </video>
      </div>
      <div>
        {renderCorrectButtons()}
      </div>
    </div>
  );
};

export default Video;
