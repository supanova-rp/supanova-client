import { AxiosProgressEvent } from "axios";
import { CourseVideoSection } from "src/types";

import FilePicker from "./FilePicker";

import FormInput from "../../FormInput";
import RemoveInput from "../../RemoveInput";

interface VideoSectionProps {
  section: CourseVideoSection,
  isLastSection: boolean,
  canRemoveVideoSection?: boolean,
  abortController: AbortController,
  fileInputRef: React.RefObject<HTMLInputElement>,
  onChangeSectionTitle: (parameter1: number, parameter2: string) => void,
  onClickRemoveSection: () => void,
  handleFileUploaded: (sectionId: number, videoUrl: string) => void,
  onFileUploadProgress: (parameter1: AxiosProgressEvent, parameter2: number) => void,
  onClickCancelFileUpload: () => void,
}

const VideoSection: React.FC<VideoSectionProps> = ({
  section,
  isLastSection,
  canRemoveVideoSection,
  abortController,
  fileInputRef,
  onChangeSectionTitle,
  onClickRemoveSection,
  handleFileUploaded,
  onFileUploadProgress,
  onClickCancelFileUpload,
}) => {
  const { id, title, videoUrl, uploadProgress } = section;

  return (
    <div
      className="d-flex flex-column"
      key={`video-section-${id}`}>
      <div className="video-section-title-container">
        <h6>Video Section</h6>
        {canRemoveVideoSection
          ? <RemoveInput onClickFunction={onClickRemoveSection} />
          : null
        }
      </div>
      <div className="video-section-input-container">
        <FormInput
          formId={`course-section-${id}`}
          formGroupClassname="my-4 section-input"
          label="Video Title"
          type="text"
          value={title}
          onChange={(e) => onChangeSectionTitle(id, e.target.value)}
          Component={(
            <FilePicker
              sectionId={id}
              abortController={abortController}
              fileInputRef={fileInputRef}
              onFileUploaded={handleFileUploaded}
              onFileUploadProgress={onFileUploadProgress}
              uploadProgress={uploadProgress}
              onClickCancelFileUpload={onClickCancelFileUpload} />
          )} />

        {videoUrl
          ? (
            <div className="video-container-admin">
              <video
                id="my-player"
                className="video-admin mb-4"
                controls
                preload="auto"
                src={videoUrl} />
            </div>
          )
          : null
        }
      </div>

      {!isLastSection
        ? <hr/>
        : null
      }
    </div>
  );
};

export default VideoSection;