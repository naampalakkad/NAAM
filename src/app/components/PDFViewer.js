import React from 'react';

const PDFViewer = ({ pdfUrl }) => {
  return (
    <embed
      src={pdfUrl}
      type="application/pdf"
      width="100%"
      height="100%" 
    />
  );
};

export default PDFViewer;
