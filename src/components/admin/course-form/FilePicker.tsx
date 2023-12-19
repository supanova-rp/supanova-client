import React from "react";
import axios, { AxiosProgressEvent } from "axios";

import { ReactComponent as TickIcon } from "../../../icons/tickIcon.svg";

import {
  InputChangeEvent,
  UploadProgress,
  UploadUrlResponse
} from "../../../types/index";
import { colors } from "../../../constants/colorPalette";

import { useWakeLock } from "../../../hooks/useWakeLock";
import useRequest from "src/hooks/useRequest";

import ProgressBar from "./ProgressBar";

interface Props {
  sectionId: number,
  abortController: AbortController,
  fileInputRef: React.RefObject<HTMLInputElement>,
  onFileUploaded: (sectionId: number, videoUrl: string) => void,
  onFileUploadProgress: (data: AxiosProgressEvent, sectionId: number) => void,
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
  const requestUploadUrl = useRequest("/get-upload-url");

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

  const onSuccess = (e: InputChangeEvent, result: UploadUrlResponse) => {
    const files = e.target?.files || [];

    uploadFileToS3(result.uploadUrl, files[0]);
  };

  const onError = (error: string) => {
    console.log(">>> error: ", error);
  };

  const handleFileSelected = (e: InputChangeEvent) => {
    requestUploadUrl({
      onSuccess: (result: any) => onSuccess(e, result),
      onError
    });
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

    return (
      <TickIcon
        stroke={colors.green}
        className="tick-upload-icon ms-2" />
    );
  };

  return (
    <div className="d-flex align-items-center mt-3">
      <label
        htmlFor={`inputTag-${sectionId}`}
        className="secondary-btn">
        Select Video
        <input
          ref={fileInputRef}
          name="file-picker"
          className="file-picker"
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
