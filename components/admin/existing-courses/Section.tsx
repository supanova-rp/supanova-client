/* eslint-disable jsx-a11y/media-has-caption */
import { ServerSideSection } from '@/index';
import { AxiosProgressEvent } from 'axios';
import EditSection from '../EditSection';

interface Props {
  section: ServerSideSection,
  isEditing?: boolean,
  index: number,
  onChangeSectionTitleField?: (parameter1: number, parameter2: string) => void,
  onFileUploaded?: (parameter1: number, parameter2: string) => void,
  onFileUploadProgress?: (paramater1: AxiosProgressEvent, parameter2: number) => void,
  onUpdateStateAfterCancellingFileUpload?: (parameter: number) => void,
  handleRemoveSection?: (paramater: number) => void,
}

const Section: React.FC<Props> = ({
  section,
  isEditing = false,
  index,
  onChangeSectionTitleField,
  onFileUploaded,
  onFileUploadProgress,
  onUpdateStateAfterCancellingFileUpload,
  handleRemoveSection,
}) => {
  if (isEditing) {
    return (
      <EditSection
        index={index}
        section={section}
        isEditing={isEditing}
        onChangeSection={onChangeSectionTitleField}
        onFileUploaded={onFileUploaded}
        onFileUploadProgress={onFileUploadProgress}
        onUpdateStateAfterCancellingFileUpload={onUpdateStateAfterCancellingFileUpload}
        handleRemoveSection={handleRemoveSection} />
    );
  }

  return (
    <div>
      <h6 className="mb-0">{`${index + 1}. ${section.title}`}</h6>
      <video
        id="my-player"
        className="video-js-edit mb-4"
        controls
        preload="auto"
        // poster="//vjs.zencdn.net/v/oceans.png"
        src={section.video_url} />
    </div>
  );
};

export default Section;
