import React from "react";
// import pdfToText from "react-pdftotext";

import PDFViewer from './PDFViewer'

const TextExtract = () => {

  function extractText(event) {
    const file = event.target.files[0];
    // pdfToText(file)
    //   .then((text) => console.log(text))
    //   .catch((error) => console.error("Failed to extract text from pdf"));
  }

  return (
    <div style={{ padding: "24px", background: "#f0f2f5" }}>
      <input type="file" accept="application/pdf" onChange={extractText} />
      <PDFViewer/>
    </div>
  );
};

export default TextExtract;
