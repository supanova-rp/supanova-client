/* eslint-disable react/no-array-index-key */
import React from 'react';
import axios, { AxiosProgressEvent } from 'axios';

import TickIcon from '@/icons/tickIcon.svg';

import { colors } from '@/constants/colorPalette';

import ProgressBar from './ProgressBar';

// TODO: error handling when axios timed out

interface Props {
  sectionId: number,
  videoName?: string,
  abortController: AbortController,
  onFileSelected?: (parameter1: number, parameter2: string) => void,
  onFileUploaded: (paramater1: number, parameter2: string) => void,
  onFileUploadProgress: (parameter1: AxiosProgressEvent, parameter2: number) => void,
  uploadProgress: number | null,
  onClickCancelFileUpload: React.MouseEventHandler<HTMLButtonElement>
}

const FilePicker: React.FC<Props> = ({
  sectionId,
  videoName,
  abortController,
  onFileSelected,
  onFileUploaded,
  onFileUploadProgress,
  uploadProgress,
  onClickCancelFileUpload,
}) => {
  const uploadFileToS3 = async (uploadUrl: string, file: File) => {
    try {
      await axios.put(uploadUrl, file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        signal: abortController.signal,
        onUploadProgress: (data: AxiosProgressEvent) => onFileUploadProgress(data, sectionId),
      });

      const videoUrl = uploadUrl.split('?')[0];

      console.log('>>> videoUrl: ', videoUrl);

      onFileUploaded(sectionId, videoUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileSelected = async (e) => {
    console.log('>>> handleFileSelected: ', e.target.files[0]);

    if (onFileSelected) {
      onFileSelected(sectionId, e.target.files[0].name);
    }

    try {
      // Get secure/signed AWS S3 url from server
      const response = await fetch('http://localhost:3001/get-upload-url');
      const result = await response.json();

      console.log('>>> result: ', result);
      console.log('>>> e.target.files[0]: ', e.target.files[0]);

      uploadFileToS3(result.uploadUrl, e.target.files[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const renderUploadProgressIcon = () => {
    if (!uploadProgress) {
      return null;
    }

    if (uploadProgress !== 1) {
      return (
        <div className="upload-file-icons-container">
          <ProgressBar value={uploadProgress} />
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm ms-3"
            onClick={onClickCancelFileUpload}>
            Cancel
          </button>
        </div>
      );
    }

    return <TickIcon stroke={colors.green} className="ms-2" />;
  };

  return (
    <div className="d-flex align-items-center mt-3">
      <label htmlFor={`inputTag-${sectionId}`} className="secondary-btn">
        Select File
        <input
          name="file-picker"
          id={`inputTag-${sectionId}`}
          type="file"
          accept="video/mp4, video/mov"
          onChange={handleFileSelected} />
      </label>
      {videoName
        ? <small className="my-0 text-muted">{videoName}</small>
        : null
      }
      {renderUploadProgressIcon()}
    </div>
  );
};

export default FilePicker;
