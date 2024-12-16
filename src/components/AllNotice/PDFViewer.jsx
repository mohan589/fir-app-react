import { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
// import path from 'path';
// import fs from 'fs';

// const pdfjsDistPath = path.dirname(require.resolve('pdfjs-dist/package.json'));
// const pdfWorkerPath = path.join(pdfjsDistPath, 'build', 'pdf.worker.mjs');

// fs.cpSync(pdfWorkerPath, './dist/pdf.worker.mjs', { recursive: true });

// import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;



function PDFViewer() {
  const [numPages, setNumPages] = useState(3);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    console.log(numPages, 'numpages')
    setNumPages(numPages);
  }

  return (
    <div>
      <Document file="/Users/mpichikala/Downloads/pdf-files/sample.pdf" onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
}

export default PDFViewer;
