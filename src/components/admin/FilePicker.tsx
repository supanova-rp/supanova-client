/* eslint-disable react/no-array-index-key */
import React from "react";
import axios, { AxiosProgressEvent } from "axios";

import { ReactComponent as TickIcon } from "../../icons/tickIcon.svg";

import { InputChangeEvent, UploadProgress } from "../../types/index";
import { colors } from "../../constants/colorPalette";
import { API_DOMAIN } from "../../constants/constants";

import { useWakeLock } from "../../hooks/useWakeLock";
import ProgressBar from "./ProgressBar";

interface Props {
  sectionId: number,
  abortController: AbortController,
  fileInputRef: React.RefObject<HTMLInputElement>,
  onFileUploaded: (paramater1: number, parameter2: string) => void,
  onFileUploadProgress: (parameter1: AxiosProgressEvent, parameter2: number) => void,
  uploadProgress: UploadProgress,
  onClickCancelFileUpload: React.MouseEventHandler<HTMLButtonElement>
}

const FilePicker: React.FC<Props> = ({
  sectionId,
  abortController,
  fileInputRef,
  onFileUploaded,
  onFileUploadProgress,
  uploadProgress,
  onClickCancelFileUpload,
}) => {
  const { releaseWakeLock, requestWakeLock } = useWakeLock();

  const uploadFileToS3 = async (uploadUrl: string, file: File) => {
    requestWakeLock();

    try {
      await axios.put(uploadUrl, file, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        signal: abortController.signal,
        onUploadProgress: (data: AxiosProgressEvent) => onFileUploadProgress(data, sectionId),
      });

      releaseWakeLock();

      const videoUrl = uploadUrl.split("?")[0];

      onFileUploaded(sectionId, videoUrl);
    } catch (error) {
      releaseWakeLock();

      console.log(error);
    }
  };

  const handleFileSelected = async (e: InputChangeEvent) => {
    try {
      // Get secure/signed AWS S3 url from server
      const response = await fetch(`${API_DOMAIN}/get-upload-url`, {
        credentials: "include",
      });
      const result = await response.json();
      const files = e.target?.files || [];

      uploadFileToS3(result.uploadUrl, files[0]);
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

    return <TickIcon
      stroke={colors.green}
      className="ms-2" />;
  };

  return (
    <div className="d-flex align-items-center mt-3">
      <label
        htmlFor={`inputTag-${sectionId}`}
        className="secondary-btn">
        Select File
        <input
          ref={fileInputRef}
          name="file-picker"
          id={`inputTag-${sectionId}`}
          type="file"
          accept="video/mp4, video/quicktime"
          onChange={handleFileSelected} />
      </label>
      {renderUploadProgressIcon()}
    </div>
  );
};

export default FilePicker;
