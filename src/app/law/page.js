import React from 'react';

const App = () => {
    const pdfUrl = 'https://drive.google.com/file/d/1GNdgzwnpyBVJKcixNkPq7XkgywU3RUT9/view';

    return (
        <div>
            <h1>PDF Viewer</h1>
            <iframe
                title="PDF Viewer"
                src={`https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(pdfUrl)}`}
                width="100%"
                height="500px"
                frameBorder="0"
            >
                <p>It appears your web browser doesn't support PDF viewing. You can download the PDF file <a href={pdfUrl}>here</a>.</p>
            </iframe>
        </div>
    );
};

export default App;
