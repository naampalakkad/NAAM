import React from 'react';
import PDFViewer from './PDFViewer';

const App = () => {
    const pdfUrl = 'https://drive.google.com/file/d/1GNdgzwnpyBVJKcixNkPq7XkgywU3RUT9/view';

    return (
        <div>
            <h1>PDF Viewer</h1>
            <PDFViewer pdfUrl={pdfUrl} />
        </div>
    );
};

export default App;
