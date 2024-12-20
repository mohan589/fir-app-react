import React, { useState } from "react";
import { Button, Form, Input, Space } from "antd";
import RichTextEditor from "../CustomComponents/RichTextEditor";
import CustomTagsComponent from "../CustomComponents/CustomTagsComponent";

const NewCircularComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    tags: ["Important", "Urgent"], // Example of existing data for tags
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditorChange = (content) => {
    setFormData((prevState) => ({
      ...prevState,
      description: content, // Update the description with the content from the editor
    }));
  };

  // Function to update tags in the form data
  const handleTagsChange = (newTags) => {
    setFormData((prevState) => ({
      ...prevState,
      tags: newTags, // Update the tags array
    }));
  };

  // Replace variables (placeholders like {{name}}, {{tag}}) in the editor content
  const handleSave = () => {
    let content = formData.description;

    // Replace {{name}} with the actual name
    content = content.replace(/{{name}}/g, formData.name);
    // Replace {{date}} with the current date
    content = content.replace(/{{date}}/g, new Date().toLocaleDateString());

    // Replace tags with their respective placeholders (e.g., {{tag1}}, {{tag2}})
    formData.tags.forEach((tag, index) => {
      content = content.replace(new RegExp(`{{tag${index + 1}}}`, 'g'), tag);
    });

    console.log("Saved content:", formData); // You can save this content or send it to an API
  };

  const handleCancel = () => {
    setFormData({ name: "", description: "", tags: [] });
  };

  return (
    <div className="form-container">
      <h2>Create New Notice</h2>
      <Form layout="vertical">
        {/* Name Field */}
        <Form.Item label="Name" required>
          <Input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter name"
          />
        </Form.Item>

        {/* Tags */}
        <Form.Item label="Tags">
          <CustomTagsComponent
            existingTags={formData.tags} // Pass the existing tags to CustomTagsComponent
            onTagsChange={handleTagsChange} // Update parent when tags change
          />
        </Form.Item>

        {/* Description (Rich Text Editor) */}
        <Form.Item label="Description" required>
          <RichTextEditor
            description={formData.description}
            handleEditorChange={handleEditorChange}
          />
        </Form.Item>

        {/* Action Buttons */}
        <Space>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button type="primary" onClick={handleSave}>
            Save
          </Button>
        </Space>
      </Form>
    </div>
  );
};

export default NewCircularComponent;
