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

  const marginStartRemoveSectionIcon = videoUrl ? "ms-4" : "ms-2";

  return (
    <div
      className="d-flex flex-column"
      key={`video-section-${id}`}>
      <h6 className="mt-4">Video Section</h6>
      <div className="d-flex flex-row align-items-center">
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

        <div className="d-flex align-items-center">
          {videoUrl
            ? (
              <div className="ms-5">
                <video
                  id="my-player"
                  className="video-js-edit mb-4"
                  controls
                  preload="auto"
                  src={videoUrl} />
              </div>
            )
            : null
          }

          {canRemoveVideoSection
            ? (
              <RemoveInput
                onClickFunction={onClickRemoveSection}
                margin={`${marginStartRemoveSectionIcon} mb-3`} />
            )
            : null
          }
        </div>
      </div>

      {!isLastSection
        ? <hr/>
        : null
      }
    </div>
  );
};

export default VideoSection;