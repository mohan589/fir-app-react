import React, { useState } from "react";
import { Button, Input, Form, notification, Card } from "antd";
import axios from "axios";

const CreateTemplateType = ({ availableTemplateTypes, setAvailableTemplateTypes }) => {
  const [newTemplateType, setNewTemplateType] = useState("");
  const [file, setFile] = useState(null);
  const [templateName, setTemplateName] = useState("");

  // Notification hook
  const [api] = notification.useNotification();

  const handleTemplateNameChange = (e) => setTemplateName(e.target.value);

  const openNotification = (message, description) => {
    api.info({
      message,
      description,
    });
  };

  // Handle template type creation
  const handleCreateTemplateType = async () => {
    if (!newTemplateType.trim()) {
      api.error({
        message: "Validation Failed",
        description: "Template Type name cannot be empty!",
      });
      return;
    }

    if (!file) {
      api.error({
        message: "File Required",
        description: "Please select a file to upload!",
      });
      return;
    }

    const formData = new FormData();
    formData.append("templateTypeName", newTemplateType);
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/saveTemplateType",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      // Update available template types state
      setAvailableTemplateTypes((prev) => [...prev, newTemplateType]);
      setNewTemplateType(""); // Reset the input field
      setFile(null); // Reset the file field

      openNotification("Template Type Created", `Template Type "${newTemplateType}" added successfully!`);
    } catch (error) {
      console.error(error);
      api.error({
        message: "Error",
        description: "An error occurred while creating the template type.",
      });
    }
  };

  // Submit handler with validation
  const handleSave = (values) => {
    if (!templateName.trim()) {
      // Display a notification or an alert if template name is empty
      api.error({
        message: "Validation Failed",
        description: "Template Name is required!",
      });
      return;
    }

    console.log("Template Type Saved:", { templateName });
    openNotification('topLeft');
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "24px" }}>
      <Card title="Create Template Type" bordered={false} style={{ backgroundColor: "#f9fafb" }}>
        <Form layout="vertical"  onFinish={handleSave}>
          {/* New Template Type Input */}
          <Form.Item
            label="Template Type Name"
            name="newTemplateType"
            onChange={handleTemplateNameChange}
            rules={[
              { required: true, message: "Please input the new template type name!" },
            ]}
          >
            <Input
              placeholder="Enter new template type"
              value={newTemplateType}
              onChange={(e) => setNewTemplateType(e.target.value)}
            />
          </Form.Item>

          {/* Submit Button */}
          <Button
            type="primary"
            onClick={handleCreateTemplateType}
            style={{ width: "100%" }}
          >
            Create Template Type
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default CreateTemplateType;
