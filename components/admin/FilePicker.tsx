/* eslint-disable react/no-array-index-key */
import axios from 'axios';

import TickIcon from '@/icons/tickIcon.svg';

import { colors } from '@/constants/colorPalette';
import ProgressBar from './ProgressBar';

// TODO: error handling when axios timed out

interface Props {
  sectionId: string,
  videoName: string,
  onFileSelected: (parameter1: string, parameter2: string) => void,
  onFileUploaded: (paramater1: string, parameter2: string) => void,
  onFileUploadProgress: (parameter1: ProgressEvent, parameter2: string) => void,
  uploadProgress: number | null,
}

const FilePicker: React.FC<Props> = ({
  sectionId,
  videoName,
  onFileSelected,
  onFileUploaded,
  onFileUploadProgress,
  uploadProgress,
}) => {
  const uploadFileToS3 = async (uploadUrl: string, file: File) => {
    try {
      await axios.put(uploadUrl, file, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (data) => onFileUploadProgress(data, sectionId),
      });

      const videoUrl = uploadUrl.split('?')[0];

      onFileUploaded(sectionId, videoUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileSelected = async (e) => {
    onFileSelected(sectionId, e.target.files[0].name);

    try {
      // Get secure/signed AWS S3 url from server
      const response = await fetch('http://localhost:3001/get-upload-url');
      const result = await response.json();

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
      return <ProgressBar value={uploadProgress} />;
    }

    return <TickIcon stroke={colors.green} className="ms-2" />;
  };

  return (
    <div className="d-flex align-items-center mt-3">
      <label htmlFor={`inputTag-${sectionId}`} className="file-picker">
        Select File
        <input name="file-picker" id={`inputTag-${sectionId}`} type="file" accept="video/mp4, video/mov" onChange={handleFileSelected} />
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
