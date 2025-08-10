import React from 'react';

const PDFViewer = ({ pdfUrl, width = '100%', height = '600px', style = {} }) => {
  if (!pdfUrl) {
    return <div>No PDF URL provided.</div>;
  }

  return (
    <div style={{ width, height, ...style, border: '1px solid #ccc', borderRadius: 4, overflow: 'hidden' }}>
      <object
        data={pdfUrl}
        type="application/pdf"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      >
        <p>
          Unable to display PDF. <a href={pdfUrl} target="_blank" rel="noopener noreferrer">Download PDF</a>
        </p>
      </object>
    </div>
  );
};

export default PDFViewer;
