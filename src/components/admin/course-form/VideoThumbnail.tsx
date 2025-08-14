interface VideoThumbnailProps {
  videoUrl: string | null;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ videoUrl }) => {
  if (!videoUrl) {
    return null;
  }

  return (
    <div className="video-container-admin">
      <video
        id="my-player"
        className="video-admin mb-4"
        controls
        controlsList="nodownload" // <-- removes download option
        disablePictureInPicture
        playsInline // <-- required for iOS
        preload="auto"
      >
        <source
          src={`${videoUrl}#t=0.001`} // <-- https://muffinman.io/blog/hack-for-ios-safari-to-display-html-video-thumbnail
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default VideoThumbnail;
