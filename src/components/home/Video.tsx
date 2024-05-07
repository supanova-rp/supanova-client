import { SyntheticEvent } from "react";

interface VideoProps {
  title: string,
  videoUrl: string,
  initialCurrentVideoTime: number,
  onVideoEnded: () => void,
  onVideoTimeUpdate: (e: SyntheticEvent<HTMLVideoElement>) => void,
}

const Video: React.FC<VideoProps> = ({
  title,
  videoUrl,
  initialCurrentVideoTime,
  onVideoEnded,
  onVideoTimeUpdate,
}) => {
  const onVideoMounted = (ref: HTMLVideoElement) => {
    if (ref && initialCurrentVideoTime && ref.currentTime !== ref.duration) {
      ref.currentTime = initialCurrentVideoTime;
    }
  };

  return (
    <div className="mb-2">
      <h4 className="mt-2 mb-3">{title}</h4>
      {videoUrl
        ? (
          <video
            id="my-player"
            className="video-js-course-view"
            controls
            autoPlay
            playsInline
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
