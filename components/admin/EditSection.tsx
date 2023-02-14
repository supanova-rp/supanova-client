/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { AxiosProgressEvent } from 'axios';

import { Section, ServerSideSection } from '@/index';

import FilePicker from './FilePicker';
import FormGroup from './FormGroup';
import RemoveInput from './RemoveInput';

interface Props {
  index: number,
  section: Section | ServerSideSection,
  onChangeSection?: (parameter1: number, parameter2: string) => void,
  onFileSelected?: (parameter1: number, parameter2: string) => void,
  onFileUploaded?: (parameter1: number, parameter2: string) => void,
  onFileUploadProgress?: (parameter1: AxiosProgressEvent, parameter2: number) => void,
  onUpdateStateAfterCancellingFileUpload?: (paramater: number) => void,
  handleRemoveSection?: (parameter: number) => void,
  isEditing?: boolean,
}

export default class EditSection extends React.Component<Props> {
  abortController: AbortController;

  constructor(props: Props) {
    super(props);

    this.abortController = new AbortController();
  }

  componentWillUnmount(): void {
    const { uploadProgress } = this.props.section;

    if (uploadProgress && uploadProgress !== 1) {
      this.onClickCancelFileUpload();
    }
  }

  cancelUploadRequest = () => {
    this.abortController.abort();
    this.abortController = new AbortController();
  };

  handleFileUploaded = (sectionId: number, videoUrl: string) => {
    const { onFileUploaded } = this.props;

    this.abortController = new AbortController();

    if (onFileUploaded) {
      onFileUploaded(sectionId, videoUrl);
    }
  };

  onClickCancelFileUpload = () => {
    this.cancelUploadRequest();

    const { onUpdateStateAfterCancellingFileUpload, section } = this.props;

    if (onUpdateStateAfterCancellingFileUpload) {
      onUpdateStateAfterCancellingFileUpload(section.id);
    }
  };

  onClickRemoveSection = () => {
    this.cancelUploadRequest();

    const { handleRemoveSection, section } = this.props;

    if (handleRemoveSection) {
      handleRemoveSection(section.id);
    }
  };

  render() {
    const marginStartRemoveSectionIcon = this.props.isEditing ? 'ms-4' : 'ms-2';

    const videoUploadProgress = this.props.isEditing ? this.props.section?.uploadProgress : this.props.section?.video?.uploadProgress;

    return (
      <div className="d-flex flex-row align-items-center" key={`chapter-${this.props.index}`}>
        <div>
          <FormGroup
            formId={`course-section-${this.props.section.id}`}
            className="my-4 section-input"
            label="Section Title"
            type="text"
            value={this.props.section.title}
            onChange={(e) => this.props.onChangeSection(this.props.section.id, e.target.value)}
            Component={(
              <FilePicker
                sectionId={this.props.section.id}
                videoName={this.props.section?.video?.name}
                abortController={this.abortController}
                onFileSelected={this.props.onFileSelected}
                onFileUploaded={this.handleFileUploaded}
                onFileUploadProgress={this.props.onFileUploadProgress}
                uploadProgress={videoUploadProgress}
                onClickCancelFileUpload={this.onClickCancelFileUpload} />
            )} />
        </div>

        <div className="d-flex align-items-center">
          {this.props.isEditing
            ? (
              <div className="ms-5">
                <video
                  id="my-player"
                  className="video-js-edit mb-4"
                  controls
                  preload="auto"
              // poster="//vjs.zencdn.net/v/oceans.png"
                  src={this.props.section?.video_url} />
              </div>
            )
            : null
          }

          <div>
            {this.props.index !== 0
              ? <RemoveInput onClickFunction={this.onClickRemoveSection} marginStart={marginStartRemoveSectionIcon} />
              : null
            }
          </div>
        </div>
      </div>
    );
  }
}
