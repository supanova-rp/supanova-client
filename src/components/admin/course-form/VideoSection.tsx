import { AxiosProgressEvent } from "axios";
import { CourseVideoSection, FileUploadType, ID } from "src/types";

import FilePicker from "./FilePicker";
import VideoThumbnail from "./VideoThumbnail";
import FormInput from "../../FormInput";
import RemoveInput from "../../RemoveInput";

interface VideoSectionProps {
  section: CourseVideoSection;
  courseId: ID;
  canRemoveVideoSection?: boolean;
  abortController: AbortController;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onChangeSectionTitle: (sectionId: ID, title: string) => void;
  onClickRemoveSection: () => void;
  handleFileUploaded: (sectionId: ID, videoUrl: string) => void;
  onVideoFileUploadProgress: (data: AxiosProgressEvent, sectionId: ID) => void;
  onClickCancelFileUpload: () => void;
  onChangeVideoStorageKey: (sectionId: ID, storageKey: ID) => void;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  section,
  courseId,
  canRemoveVideoSection,
  abortController,
  fileInputRef,
  onChangeSectionTitle,
  onClickRemoveSection,
  handleFileUploaded,
  onVideoFileUploadProgress,
  onClickCancelFileUpload,
  onChangeVideoStorageKey,
}) => {
  const { id, title, storageKey, uploadProgress, uploaded } = section;

  return (
    <div className="d-flex flex-column" key={`video-section-${id}`}>
      <div className="video-section-title-container">
        <h6>Video Section</h6>
        {canRemoveVideoSection ? (
          <RemoveInput onClickFunction={onClickRemoveSection} />
        ) : null}
      </div>

      <div className="video-section-input-container">
        <FormInput
          formId={`course-section-${id}`}
          formGroupClassname="my-4 section-input"
          label="Video Title"
          type="text"
          value={title}
          onChange={e => onChangeSectionTitle(id, e.target.value)}
          Component={
            <FilePicker
              fileId={id}
              courseId={courseId}
              fileType={FileUploadType.Video}
              abortController={abortController}
              fileInputRef={fileInputRef}
              onFileUploaded={handleFileUploaded}
              onFileUploadProgress={onVideoFileUploadProgress}
              uploaded={uploaded}
              uploadProgress={uploadProgress}
              onClickCancelFileUpload={onClickCancelFileUpload}
              onNewFileSelected={onChangeVideoStorageKey}
            />
          }
        />

        {storageKey ? (
          <VideoThumbnail
            key={storageKey}
            courseId={courseId}
            storageKey={storageKey}
          />
        ) : null}
      </div>
    </div>
  );
};

export default VideoSection;
