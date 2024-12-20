import React, { useState } from 'react';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import { Upload, Card, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadAndViewDoc = () => {
  const [docs, setDocs] = useState([{ uri: require('/Users/mpichikala/personal/fir-app-react/src/components/AllCirculars/Charge Sheet.docx') }]);

  // Handle file upload
  const handleFileUpload = (file) => {
    const isDoc =
      file.type === 'application/msword' ||
      file.type ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.type === 'application/pdf';
    if (!isDoc) {
      message.error('You can only upload Word or PDF files!');
      return false;
    }

    const fileURL = URL.createObjectURL(file);
    setDocs([{ uri: require('/Users/mpichikala/personal/fir-app-react/src/components/AllCirculars/Charge Sheet.docx') }]); // Update the docs state with the uploaded file URL
    return false; // Prevent Ant Design from auto-uploading
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Upload and View Word Document</h2>

      {/* Ant Design Card for Upload */}
      <Card style={{ marginBottom: '20px' }}>
        <Upload
          beforeUpload={handleFileUpload}
          showUploadList={false} // Hide default upload list
          accept=".doc,.docx,.pdf" // Accept only Word and PDF files
        >
          <button className="ant-btn ant-btn-primary">
            <UploadOutlined /> Click to Upload
          </button>
        </Upload>
      </Card>

      {/* Document Viewer */}
      <Card style={{ height: '80vh', border: '1px solid #ccc' }}>
        {docs.length > 0 ? (
          <DocViewer
            documents={docs}
            pluginRenderers={DocViewerRenderers}
            style={{ width: '100%', height: '100%' }}
          />
        ) : (
          <p>Please upload a document to view.</p>
        )}
      </Card>
    </div>
  );
};

export default UploadAndViewDoc;
