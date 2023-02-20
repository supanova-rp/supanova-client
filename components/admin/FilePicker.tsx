/* eslint-disable react/no-array-index-key */
import React from 'react';
import axios, { AxiosProgressEvent } from 'axios';

import TickIcon from '@/icons/tickIcon.svg';

import { sanitizeArray } from '@/utils/array';
import { InputChangeEvent, UploadProgress } from '@/index';
import { colors } from '@/constants/colorPalette';
import { API_DOMAIN } from '@/constants/constants';

import ProgressBar from './ProgressBar';

// TODO: error handling when axios timed out

interface Props {
  sectionId: number,
  abortController: AbortController,
  onFileUploaded: (paramater1: number, parameter2: string) => void,
  onFileUploadProgress: (parameter1: AxiosProgressEvent, parameter2: number) => void,
  uploadProgress: UploadProgress,
  onClickCancelFileUpload: React.MouseEventHandler<HTMLButtonElement>
}

const FilePicker: React.FC<Props> = ({
  sectionId,
  abortController,
  onFileUploaded,
  onFileUploadProgress,
  uploadProgress,
  onClickCancelFileUpload,
}) => {
  const uploadFileToS3 = async (uploadUrl: string, file: File) => {
    try {
      console.log('uploadFileToS3');
      await axios.put(uploadUrl, file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        signal: abortController.signal,
        onUploadProgress: (data: AxiosProgressEvent) => onFileUploadProgress(data, sectionId),
      });

      const videoUrl = uploadUrl.split('?')[0];

      onFileUploaded(sectionId, videoUrl);
    } catch (error) {
      console.log('uploadFileToS3 fired');
      console.log(error);
    }
  };

  const handleFileSelected = async (e: InputChangeEvent) => {
    console.log('>>> handleFileSelected');
    try {
      // Get secure/signed AWS S3 url from server
      const response = await fetch(`${API_DOMAIN}/get-upload-url`);
      const result = await response.json();
      const files = e.target?.files || [];

      console.log('>>> response: ', response);
      console.log('>>> result: ', result);

      uploadFileToS3(result.uploadUrl, files[0]);
    } catch (error) {
      console.log('HandlefileSelectedFunc fired');
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
      {renderUploadProgressIcon()}
    </div>
  );
};

export default FilePicker;
