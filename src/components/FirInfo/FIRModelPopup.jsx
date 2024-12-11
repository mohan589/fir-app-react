import React, { useState, useEffect } from 'react';
import { Button, Modal, Select, Spin } from 'antd';
import axios from 'axios';  // Import Axios for API call

const { Option } = Select;

const FIRModelPopup = ({ setOpen, open, setWorkFlowData }) => {
  const [loading, setLoading] = useState(false);
  const [templates, setTemplates] = useState([]);  // To store the fetched templates
  const [selectedTemplate, setSelectedTemplate] = useState(null); // To store the selected template

  useEffect(() => {
    // Fetch templates when the modal is opened
    if (open) {
      fetchTemplates();
    }
  }, [open]);

  // Function to fetch templates using Axios
  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const response = await axios.get('YOUR_API_ENDPOINT_HERE');  // Replace with your API endpoint
      setTemplates(response.data);  // Assuming the response is an array of templates
      setLoading(false);
    } catch (error) {
      console.error('Error fetching templates:', error);
      setLoading(false);
    }
  };

  // Handle the selection of a template
  const handleTemplateSelect = (value) => {
    setSelectedTemplate(value); // Set the selected template
  };

  // Handle Ok button click, close the modal, and perform any necessary action
  const handleOk = () => {
    if (selectedTemplate) {
      setLoading(true);
      // Simulate an action (e.g., API call) with a delay before closing the modal
      setTimeout(() => {
        setLoading(false);
        setOpen(false); // Close the modal after the action is completed
      }, 2000);
      setWorkFlowData([{name: 'UserInfo',
        description: 'Desc'}, {name: 'Suspect Info',
          description: 'Desc'}, {name: 'Witness Info',
            description: 'Desc'}, {name: 'Final Report',
              description: 'Desc'}]);
    } else {
      alert('Please select a template');  // Show an alert if no template is selected
    }
  };

  const handleCancel = () => {
    setOpen(false); // Close the modal immediately on cancel
  };

  return (
    <Modal
      open={open} // Controlled by the parent component's state
      title="Select FIR Template"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          Submit
        </Button>,
      ]}
      maskClosable={true} // Allow closing the modal when clicking outside
    >
      <div>
        {loading ? (
          <Spin size="large" />  // Show a loading spinner while fetching templates
        ) : (
          <Select
            value={selectedTemplate}
            onChange={handleTemplateSelect}
            style={{ width: '100%' }}
            placeholder="Select a template"
          >
            {
              templates.map((template) => (
                <Option key={template.id} value={template.id}>
                  {template.name} || 'Demo'
                </Option>
              ))
              }
            {
            <Option key={'1'} value={'1'}>
              Demo
            </Option>
            }
          </Select>
        )}
      </div>
    </Modal>
  );
};

export default FIRModelPopup;
