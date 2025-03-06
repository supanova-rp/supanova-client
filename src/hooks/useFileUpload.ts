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

  // Clean up on unmount if upload is in progress
  useEffect(() => {
    return () => {
      if (uploadProgress && uploadProgress !== 1) {
        handleCancelFileUpload();
      }
    };
  }, [uploadProgress]);

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
