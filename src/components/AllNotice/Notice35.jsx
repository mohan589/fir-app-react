import React, { useState } from 'react';
import { Upload, Button, Card, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const Notice35 = () => {
  const [fileUrl, setFileUrl] = useState(null); // State for the PDF URL
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // Handle upload and convert file to Blob URL
  const handleUpload = (info) => {
    const file = info.file; // Access uploaded file

    // Check if the file is a PDF
    if (file.type !== 'application/pdf') {
      message.error('You can only upload PDF files!');
      return;
    }

    // Create a URL from the file (Blob)
    const fileURL = URL.createObjectURL(file);
    setFileUrl(fileURL);
    message.success(`${file.name} uploaded successfully.`);
  };

  return (
    <div style={{ padding: 20 }}>
      <Card title="PDF Viewer with Upload" bordered style={{ width: '100%' }}>
        {/* File Upload */}
        <Upload
          accept=".pdf"
          beforeUpload={() => false} // Prevent auto upload
          onChange={handleUpload}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />} type="primary">
            Upload PDF
          </Button>
        </Upload>

        {/* PDF Viewer */}
        {fileUrl && (
          <div style={{ marginTop: 20, border: '1px solid #ccc', height: '80vh' }}>
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.js`}>
              <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
            </Worker>
          </div>
        )}
      </Card>
    </div>
  );
};


export default Notice35;
