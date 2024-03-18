/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/media-has-caption */
import { SyntheticEvent } from "react";
import { Button } from "react-bootstrap";

import { colors } from "../../constants/colorPalette";
import { ReactComponent as ChevronLeft } from "../../icons/chevronLeft.svg";
import { ChangeDirection } from "../../types/index";

import Header from "./Header";

interface VideoProps {
  title: string,
  videoUrl: string,
  courseTitle: string,
  hasNext: boolean,
  hasPrevAndNext: boolean,
  initialCurrentVideoTime: number,
  onExitVideo: () => void,
  onChangeVideo: (direction: ChangeDirection) => void,
  onVideoEnded: () => void,
  onVideoTimeUpdate: (e: SyntheticEvent<HTMLVideoElement>) => void,
}

const Video: React.FC<VideoProps> = ({
  title,
  videoUrl,
  courseTitle,
  hasNext,
  hasPrevAndNext,
  initialCurrentVideoTime,
  onExitVideo,
  onChangeVideo,
  onVideoEnded,
  onVideoTimeUpdate,
}) => {

  const renderDirectionButtons = (className: string) => {
    if (hasPrevAndNext) {
      return (
        <div>
          <Button
            onClick={() => onChangeVideo("prev")}
            type="button"
            className={`me-4 ${className}`}>
            Prev
          </Button>

          <Button
            onClick={() => onChangeVideo("next")}
            type="button"
            className={className}>
            Next
          </Button>
        </div>
      );
    }

    if (hasNext) {
      return (
        <Button
          onClick={() => onChangeVideo("next")}
          type="button"
          className={className}>
          Next
        </Button>
      );
    }

    return (
      <Button
        onClick={() => onChangeVideo("prev")}
        className={className}>
        Prev
      </Button>
    );
  };

  const onVideoMounted = (ref: HTMLVideoElement) => {
    if (ref && initialCurrentVideoTime && ref.currentTime !== ref.duration) {
      ref.currentTime = initialCurrentVideoTime;
    }
  };

  return (
    <div className="mb-4 ms-4">
      <div>
        <div className="d-flex align-items-center">
          <div role="button">
            <ChevronLeft
              stroke={colors.orange}
              className="mt-4 me-1"
              onClick={onExitVideo} />
          </div>
          <Header title={courseTitle} />
        </div>
        <h5 className="mt-2 mb-4">{title}</h5>
        {videoUrl
          ? (
            <video
              id="my-player"
              className="video-js-course-view"
              controls
              preload="auto"
              data-setup="{}"
              ref={onVideoMounted}
              onTimeUpdate={onVideoTimeUpdate}
              onEnded={onVideoEnded}
              src={videoUrl} />
          )
          : null
        }

      </div>
      <div>
        {renderDirectionButtons("main-button")}
      </div>
    </div>
  );
};

export default Video;
