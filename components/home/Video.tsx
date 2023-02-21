/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/media-has-caption */
import { SyntheticEvent } from 'react';
import { Button } from 'react-bootstrap';

import { colors } from '@/constants/colorPalette';
import ChevronLeft from '@/icons/chevronLeft.svg';
import { Course, LogoutErrorProps } from '@/index';

import Header from './Header';

interface Props extends LogoutErrorProps {
  currentCourseIndex: number,
  currentSectionIndex: number,
  initialCurrentVideoTime: number,
  allCourses: Course[],
  hasNext: boolean,
  hasPrev: boolean,
  onExitVideo: () => void,
  onChangeVideo: (parameter: string) => void,
  onVideoEndedMarkSectionAsComplete: () => void,
  onTimeUpdateSaveToLocalStorage: (e: SyntheticEvent<HTMLVideoElement>) => void,
}

const Video: React.FC<Props> = ({
  logoutError,
  allCourses,
  hasNext,
  hasPrev,
  initialCurrentVideoTime,
  currentCourseIndex,
  currentSectionIndex,
  onExitVideo,
  onChangeVideo,
  onVideoEndedMarkSectionAsComplete,
  onTimeUpdateSaveToLocalStorage,
}) => {
  const currentSection = allCourses[currentCourseIndex].sections[currentSectionIndex];

  const renderDirectionButtons = () => {
    if (hasNext) {
      return <Button onClick={() => onChangeVideo('next')} type="button">Next</Button>;
    }

    if (hasPrev) {
      return <Button onClick={() => onChangeVideo('prev')}>Previous</Button>;
    }

    return (
      <div>
        <Button onClick={() => onChangeVideo('prev')} type="button" className="me-4">Prev</Button>
        <Button onClick={() => onChangeVideo('next')} type="button">Next</Button>
      </div>
    );
  };

  const onVideoMounted = (ref) => {
    if (ref && initialCurrentVideoTime && ref.currentTime !== ref.duration) {
      ref.currentTime = initialCurrentVideoTime;
    }
  };

  return (
    <div className="ms-4">
      <div>
        {/* TODO: find a way to add margin on the chevron */}
        <div className="d-flex align-items-center">
          <div className="p-1 clickable">
            <ChevronLeft stroke={colors.orange} className="mt-3 me-1" onClick={onExitVideo} />
          </div>
          <Header title={allCourses[currentCourseIndex].title} logoutError={logoutError} />
        </div>
        <h5 className="mt-2 mb-4">{`${currentSectionIndex + 1}. ${currentSection.title}`}</h5>
        {currentSection.videoUrl
          ? (
            <video
              id="my-player"
              className="video-js-home"
              controls
              preload="auto"
              data-setup="{}"
              ref={onVideoMounted}
              onTimeUpdate={onTimeUpdateSaveToLocalStorage}
              onEnded={onVideoEndedMarkSectionAsComplete}>
              <source src={currentSection.videoUrl} type="video/mp4" />
            </video>
          )
          : null
        }

      </div>
      <div>
        {renderDirectionButtons()}
      </div>
    </div>
  );
};

export default Video;
