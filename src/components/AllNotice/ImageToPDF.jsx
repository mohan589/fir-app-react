import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { PlusOutlined, DownloadOutlined } from "@ant-design/icons";
import { PDFDocument } from "pdf-lib";
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

const ImageToPDF = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null); // State for the PDF URL 
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const handleFileRead = (file) => {
    if (!file.type.startsWith("image/")) {
      message.error("You can only upload image files!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedFile(event.target.result); // Save the file as an ArrayBuffer
    };
    reader.readAsArrayBuffer(file);
  };

  const generatePDF = async () => {
    if (!uploadedFile) {
      message.warning("Please upload an image first!");
      return;
    }

    try {
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([600, 800]); // Set page dimensions

      // Embed the uploaded image
      const imageBytes = new Uint8Array(uploadedFile);
      const image = await pdfDoc.embedPng(imageBytes); // Use embedPng for PNG images
      const { width, height } = image.scale(0.1); // Scale down if necessary

      // Draw the image on the page
      page.drawImage(image, {
        x: 10,
        y: 600,
        width,
        height
      });

      // Serialize the PDF to bytes
      const pdfBytes = await pdfDoc.save();

      // Create a Blob and download the PDF
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      // const link = document.createElement("a");
      // link.href = url;
      // link.download = "image.pdf";
      // link.click();
      setFileUrl(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      message.error("Failed to generate the PDF.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Upload
        accept="image/*"
        showUploadList={false}
        beforeUpload={(file) => {
          handleFileRead(file); // Read the file as soon as it's selected
          return false; // Prevent default upload behavior
        }}
      >
        <Button icon={<PlusOutlined />}>Upload Image</Button>
      </Upload>
      <Button
        type="primary"
        icon={<DownloadOutlined />}
        onClick={generatePDF}
        style={{ marginTop: 20 }}
        disabled={!uploadedFile}
      >
        Generate PDF
      </Button>
      {fileUrl && (
          <div style={{ marginTop: 20, border: '1px solid #ccc', height: '80vh' }}>
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.js`}>
              <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
            </Worker>
          </div>
        )}
    </div>
  );
};

export default ImageToPDF;
