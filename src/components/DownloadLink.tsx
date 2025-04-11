import React from "react";
import toast from "react-hot-toast";
import PDFIcon from "src/assets/icons/pdf.svg?react";
import { REACT_TOAST_DURATION } from "src/constants/constants";

import Row from "./Row";

interface Props {
  url: string;
  name: string;
}

export const DownloadLink: React.FC<Props> = ({ url, name }) => {
  const handleDownload = async () => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${name}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      toast.error("Download failed... please try again", REACT_TOAST_DURATION);

      console.error("Download failed: ", err);
    }
  };

  return (
    <a type="button" onClick={handleDownload} className="download-link">
      <Row>
        <PDFIcon width={24} height={24} className="pdf-icon" />
        {name}.pdf
      </Row>
    </a>
  );
};

export default DownloadLink;
