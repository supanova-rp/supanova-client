/* eslint-disable jsx-a11y/media-has-caption */
import React, { createRef } from "react";
import { AxiosProgressEvent } from "axios";

import { CourseSection } from "../../types/index";

import FilePicker from "./FilePicker"
import FormGroup from "./FormGroup";
import RemoveInput from "./RemoveInput";

interface Props {
  index: number,
  section: CourseSection,
  canRemove?: boolean,
  onChangeSectionTitle: (parameter1: number, parameter2: string) => void,
  onFileUploaded: (parameter1: number, parameter2: string) => void,
  onFileUploadProgress: (parameter1: AxiosProgressEvent, parameter2: number) => void,
  onUpdateStateAfterCancellingFileUpload: (paramater: number) => void,
  handleRemoveSection: (parameter: number) => void,
}

export default class EditSection extends React.Component<Props> {
  abortController: AbortController;

  fileInputRef: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);

    this.abortController = new AbortController();
    this.fileInputRef = createRef();
  }

  componentWillUnmount(): void {
    const { uploadProgress } = this.props.section;

    if (uploadProgress && uploadProgress !== 1) {
      this.onClickCancelFileUpload();
    }
  }

  cancelUploadRequest = () => {
    if (this.fileInputRef.current) {
      this.fileInputRef.current.value = "";
    }

    this.abortController.abort();
    this.abortController = new AbortController();
  };

  handleFileUploaded = (sectionId: number, videoUrl: string) => {
    const { onFileUploaded } = this.props;

    this.abortController = new AbortController();

    onFileUploaded(sectionId, videoUrl);
  };

  onClickCancelFileUpload = () => {
    const { onUpdateStateAfterCancellingFileUpload, section } = this.props;

    this.cancelUploadRequest();
    onUpdateStateAfterCancellingFileUpload(section.id);
  };

  onClickRemoveSection = () => {
    const { handleRemoveSection, section } = this.props;

    this.cancelUploadRequest();
    handleRemoveSection(section.id);
  };

  render() {
    const marginStartRemoveSectionIcon = this.props.section.videoUrl ? "ms-4" : "ms-2";

    return (
      <div className="d-flex flex-row align-items-center" key={`chapter-${this.props.index}`}>
        <div>
          <FormGroup
            formId={`course-section-${this.props.section.id}`}
            className="my-4 section-input"
            label="Section Title"
            type="text"
            value={this.props.section.title}
            onChange={(e) => this.props.onChangeSectionTitle(this.props.section.id, e.target.value)}
            Component={(
              <FilePicker
                sectionId={this.props.section.id}
                abortController={this.abortController}
                fileInputRef={this.fileInputRef}
                onFileUploaded={this.handleFileUploaded}
                onFileUploadProgress={this.props.onFileUploadProgress}
                uploadProgress={this.props.section.uploadProgress}
                onClickCancelFileUpload={this.onClickCancelFileUpload} />
            )} />
        </div>

        <div className="d-flex align-items-center">
          {this.props.section.videoUrl
            ? (
              <div className="ms-5">
                <video
                  id="my-player"
                  className="video-js-edit mb-4"
                  controls
                  preload="auto"
                  src={this.props.section.videoUrl} />
              </div>
            )
            : null
          }

          <div>
            {this.props.canRemove
              ? <RemoveInput onClickFunction={this.onClickRemoveSection} margin={marginStartRemoveSectionIcon} />
              : null
            }
          </div>
        </div>
      </div>
    );
  }
}
