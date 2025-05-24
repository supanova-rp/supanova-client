import { useEffect, useRef } from "react";
import { ID, UploadProgress } from "src/types";

export const useFileUpload = (
  id: ID,
  uploadProgress: UploadProgress,
  onFileUploaded: (sectionId: ID, videoUrl: string) => void,
  onFileUploadCancelled: (sectionId: ID) => void,
) => {
  const abortControllerRef = useRef<AbortController>(new AbortController());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadProgressRef = useRef(uploadProgress);

  const cancelUploadRequest = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();
  };

  const handleCancelFileUpload = () => {
    cancelUploadRequest();
    onFileUploadCancelled(id);
  };

  useEffect(() => {
    uploadProgressRef.current = uploadProgress;
  }, [uploadProgress]);

  // Clean up on unmount if upload is in progress
  // Use a ref to upload progress so we don't have to put uploadProgress in the dependency array
  // otherwise it will trigger handleCancelFileUpload when it closes
  useEffect(() => {
    return () => {
      const latestProgress = uploadProgressRef.current;
      if (latestProgress && latestProgress !== 1) {
        handleCancelFileUpload();
      }
    };
  }, []);

  const handleFileUploaded = (sectionId: ID, videoUrl: string) => {
    abortControllerRef.current = new AbortController();
    onFileUploaded(sectionId, videoUrl);
  };

  return {
    abortController: abortControllerRef.current,
    fileInputRef,
    handleFileUploaded,
    handleCancelFileUpload,
    cancelUploadRequest,
  };
};
