/* eslint-disable react/no-array-index-key */
import axios from "axios";
import { useFilePicker } from 'use-file-picker';
import { Button } from 'react-bootstrap';

const FilePicker = () => {
  const [openFileSelector, { filesContent, plainFiles, loading }] = useFilePicker({
    accept: ['.mp4', '.mov'],
    multiple: false,
  });

  const uploadFileToS3 = async (uploadUrl) => {
    try {
      const response = await axios.put(uploadUrl, plainFiles[0], {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: data => {
          console.log('>>> upload progress: ', data);
        },
      })

      console.log('>>> response: ', response);

      const videoUrl = uploadUrl.split('?')[0];

      console.log('>>> videoUrl: ', videoUrl);

    } catch (error) {
      console.log(error);
    }
  }

  // TODO: make it so this gets called on the onChange event of the file picker input
  const onFileSelected = async () => {
    try {
      // Get secure/signed AWS S3 url from server
      const response = await fetch('http://localhost:3001/get-upload-url');
      const result = await response.json();

      console.log('>>> result: ', result);

      uploadFileToS3(result.uploadUrl)
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return <small className="text-muted">Loading...</small>;
  }

  return (
    <div className="d-flex align-items-center mt-3">

      {/* TODO: replace this with a regular <input /> element */}
      <Button
        variant="outline-secondary"
        size="sm"
        className="me-2"
        onClick={() => openFileSelector()}>
        Select files
      </Button>

      {filesContent.map((file, index) => (
        <small className="my-0 text-muted" key={`${index}-${file.name}`}>{file.name}</small>
      ))}
      <Button
        variant="outline-secondary"
        size="sm"
        className="me-2"
        onClick={onFileSelected}>
        Test Upload
      </Button>
    </div>
  );
};

export default FilePicker;
