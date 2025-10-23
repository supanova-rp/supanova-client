import React from "react";

interface VideoLoaderProps {
  title: string;
}

const VideoLoader: React.FC<VideoLoaderProps> = ({ title }) => {
  return (
    <div className="mb-2">
      <h4 className="mt-2 mb-3">{title}</h4>
      <div style={{ aspectRatio: "16/9", position: "relative" }}>
        <video
          id="video-loader"
          className="video-js-course-view"
          controls
          controlsList="nodownload"
          disablePictureInPicture
          playsInline
          preload="auto"
          data-setup="{}"
        />
        <div className="video-loader-spinner-container">
          <div className="video-loader-spinner" />
        </div>
      </div>
    </div>
  );
};

export default VideoLoader;
