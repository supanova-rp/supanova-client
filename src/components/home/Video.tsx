import { SyntheticEvent } from "react";

import { colors } from "../../constants/colorPalette";
import { ReactComponent as ChevronLeft } from "../../icons/chevronLeft.svg";

import Header from "./Header";

interface VideoProps {
  title: string,
  videoUrl: string,
  courseTitle: string,
  initialCurrentVideoTime: number,
  onExitVideo: () => void,
  onVideoEnded: () => void,
  onVideoTimeUpdate: (e: SyntheticEvent<HTMLVideoElement>) => void,
}

const Video: React.FC<VideoProps> = ({
  title,
  videoUrl,
  courseTitle,
  initialCurrentVideoTime,
  onExitVideo,
  onVideoEnded,
  onVideoTimeUpdate,
}) => {
  const onVideoMounted = (ref: HTMLVideoElement) => {
    if (ref && initialCurrentVideoTime && ref.currentTime !== ref.duration) {
      ref.currentTime = initialCurrentVideoTime;
    }
  };

  return (
    <div className="mb-4 ms-4">
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
  );
};

export default Video;
