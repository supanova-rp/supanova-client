/* eslint-disable react/no-array-index-key */
import { useFilePicker } from 'use-file-picker';
import { Button } from 'react-bootstrap';

const FilePicker = () => {
  const [openFileSelector, { filesContent, loading }] = useFilePicker({
    accept: ['.mp4', '.mov'],
    multiple: false,
  });

  if (loading) {
    return <small className="text-muted">Loading...</small>;
  }

  console.log('>>> filesContent: ', filesContent);

  return (
    <div className="d-flex align-items-center mt-3">
      <Button
        variant="outline-secondary"
        size="sm"
        className="me-2"
        onClick={() => openFileSelector()}>Select files
      </Button>
      {filesContent.map((file, index) => (
        <small className="my-0 text-muted" key={`${index}-${file.name}`}>{file.name}</small>
      ))}
    </div>
  );
};

export default FilePicker;
