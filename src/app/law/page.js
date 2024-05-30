import PDFViewer from '../components/PDFViewer';

const MyPage = () => {
    const pdfUrl = './law.pdf';

    return (
        
        <div className="page">
            <h1>BYELAW</h1>
            <div className="pdf-viewer">
            <PDFViewer pdfUrl={pdfUrl} />
            </div>
        </div>
    );
};

export default MyPage;
