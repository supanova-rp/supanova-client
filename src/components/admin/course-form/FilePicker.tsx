import axios, { AxiosProgressEvent } from "axios";
import React from "react";
import useRequest from "src/hooks/useRequest";

import ProgressBar from "./ProgressBar";
import TickIcon from "../../../assets/icons/tickIcon.svg?react";
import { colors } from "../../../constants/colorPalette";
import { useWakeLock } from "../../../hooks/useWakeLock";
import {
  FileUploadType,
  ID,
  InputChangeEvent,
  UploadProgress,
  UploadUrlResponse,
} from "../../../types/index";

interface Props {
  fileId: ID;
  courseId: ID;
  fileType: FileUploadType;
  abortController: AbortController;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileUploaded: (fileId: ID, videoUrl: string) => void;
  onFileUploadProgress: (data: AxiosProgressEvent, fileId: ID) => void;
  uploadProgress: UploadProgress;
  onClickCancelFileUpload: React.MouseEventHandler<HTMLButtonElement>;
}

const fileTypeMap = {
  [FileUploadType.Video]: {
    endpoint: "/get-video-upload-url",
    label: "Video",
    accept: "video/mp4, video/quicktime",
  },
  [FileUploadType.Material]: {
    endpoint: "/get-material-upload-url",
    label: "File",
    accept: "*",
  },
};

const FilePicker: React.FC<Props> = ({
  fileType,
  fileId,
  courseId,
  abortController,
  fileInputRef,
  onFileUploaded,
  onFileUploadProgress,
  uploadProgress,
  onClickCancelFileUpload,
}) => {
  const { releaseWakeLock, requestWakeLock } = useWakeLock();
  const requestUploadUrl = useRequest(fileTypeMap[fileType].endpoint);

  const uploadFileToS3 = async (uploadUrl: string, file: File) => {
    requestWakeLock();

    try {
      await axios.put(uploadUrl, file, {
        headers: {
          // TODO: use file type that matches file?
          "Content-Type": "multipart/form-data",
        },
        signal: abortController.signal,
        onUploadProgress: (data: AxiosProgressEvent) =>
          onFileUploadProgress(data, fileId),
      });

      releaseWakeLock();

      const videoUrl = uploadUrl.split("?")[0];

      onFileUploaded(fileId, videoUrl);
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
    console.log(error);
  };

  const handleFileSelected = (e: InputChangeEvent) => {
    requestUploadUrl({
      requestBody: {
        fileId,
        courseId,
      },
      onSuccess: (result: any) => onSuccess(e, result),
      onError,
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
            onClick={onClickCancelFileUpload}
          >
            Cancel
          </button>
        </div>
      );
    }

    return <TickIcon stroke={colors.green} className="tick-upload-icon ms-2" />;
  };

  return (
    <div className="d-flex align-items-center mt-3">
      <label htmlFor={`inputTag-${fileId}`} className="secondary-btn">
        Select {fileTypeMap[fileType].label}
        <input
          ref={fileInputRef}
          name="file-picker"
          className="file-picker"
          id={`inputTag-${fileId}`}
          type="file"
          accept={fileTypeMap[fileType].accept}
          onChange={handleFileSelected}
        />
      </label>
      {renderUploadProgressIcon()}
    </div>
  );
};

export default FilePicker;
