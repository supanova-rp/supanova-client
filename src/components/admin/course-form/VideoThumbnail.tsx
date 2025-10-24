import { useQuery } from "src/hooks/useQuery";
import { ID } from "src/types";
import { CourseVideoServerModel } from "src/types/server";

interface VideoThumbnailProps {
  courseId: ID;
  storageKey: string;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  courseId,
  storageKey,
}) => {
  const { data } = useQuery<CourseVideoServerModel>("/video-url", {
    requestBody: {
      courseId,
      storageKey,
    },
  });

  if (!data?.url) {
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
          src={`${data.url}#t=0.001`} // <-- https://muffinman.io/blog/hack-for-ios-safari-to-display-html-video-thumbnail
          type="video/mp4"
        />
      </video>
    </div>
  );
};

export default VideoThumbnail;
