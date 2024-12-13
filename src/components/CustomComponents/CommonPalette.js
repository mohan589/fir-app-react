import React, { useState } from "react";
import { Input, Button, Select, Form, Space, message, Card } from "antd";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;

const DynamicFormBuilder = () => {
  const [formName, setFormName] = useState("");
  const [fields, setFields] = useState([]);
  const [form] = Form.useForm();

  // Add a new field to the form
  const addField = () => {
    setFields([
      ...fields,
      { id: Date.now(), name: "", type: "text" }, // Default type is 'text'
    ]);
  };

  // Update a specific field with new values for its name or type
  const updateField = (id, key, value) => {
    setFields((prevFields) =>
      prevFields.map((field) =>
        field.id === id ? { ...field, [key]: value } : field
      )
    );
  };

  // Handle form metadata submission (excluding form data)
  const handleSubmit = async () => {
    if (!formName.trim()) {
      message.error("Form name is required!");
      return;
    }

    const invalidField = fields.find((field) => !field.name.trim());
    if (invalidField) {
      message.error("All fields must have a name!");
      return;
    }

    // Only send metadata (formName and field definitions)
    const metadata = {
      formName,
      fields: fields.map(({ id, ...rest }) => rest), // Exclude `id` from metadata
    };

    try {
      const response = await axios.post("https://your-backend-api.com/forms", metadata);
      message.success("Form metadata submitted successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      message.error("Failed to submit the form metadata!");
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Card title="Build Your Form" bordered={true} style={{ marginTop: "20px" }}>
          {/* Form Name Input */}
          <Input
            placeholder="Enter form name"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            style={{ marginBottom: "10px" }}
          />

          {/* Fields Section */}
          <div>
            <h4>Fields</h4>
            {fields.map((field) => (
              <Space
                key={field.id}
                style={{
                  display: "flex",
                  marginBottom: "8px",
                  width: "100%",
                }}
              >
                <Input
                  placeholder="Field name"
                  value={field.name}
                  onChange={(e) => updateField(field.id, "name", e.target.value)}
                  style={{ flex: 1, marginRight: "8px" }}
                />
                <Select
                  value={field.type}
                  onChange={(value) => updateField(field.id, "type", value)}
                  style={{ flex: 1, width: "200px" }}
                >
                  <Option value="text">Text</Option>
                  <Option value="number">Number</Option>
                  <Option value="select">Dropdown</Option>
                  <Option value="date">Date</Option>
                  <Option value="textarea">TextArea</Option>
                </Select>
                <Button
                  danger
                  onClick={() =>
                    setFields((prevFields) =>
                      prevFields.filter((f) => f.id !== field.id)
                    )
                  }
                >
                  Remove
                </Button>
              </Space>
            ))}
            <Button type="dashed" onClick={addField} style={{ width: "100%", marginBottom: "20px" }}>
              + Add Field
            </Button>
          </div>

          {/* Form Preview Section */}
          <div style={{ marginTop: "20px" }}>
            <h4>Preview Form</h4>
            <Form form={form} onFinish={handleSubmit} layout="vertical">
              {fields.map((field) => {
                if (field.type === "text" || field.type === "number") {
                  return (
                    <Form.Item
                      key={field.id}
                      label={field.name}
                      name={field.name}
                      rules={[{ required: true, message: `${field.name} is required` }]}
                    >
                      <Input type={field.type} />
                    </Form.Item>
                  );
                } else if (field.type === "select") {
                  return (
                    <Form.Item
                      key={field.id}
                      label={field.name}
                      name={field.name}
                      rules={[{ required: true, message: `${field.name} is required` }]}
                    >
                      <Select>
                        <Option value="option1">Option 1</Option>
                        <Option value="option2">Option 2</Option>
                      </Select>
                    </Form.Item>
                  );
                } else if (field.type === "date") {
                  return (
                    <Form.Item
                      key={field.id}
                      label={field.name}
                      name={field.name}
                      rules={[{ required: true, message: `${field.name} is required` }]}
                    >
                      <Input type="date" />
                    </Form.Item>
                  );
                } else if (field.type === "textarea") {
                  return (
                    <Form.Item
                      key={field.id}
                      label={field.name}
                      name={field.name}
                      rules={[{ required: true, message: `${field.name} is required` }]}
                    >
                      <TextArea rows={4} placeholder="maxLength is 5000" maxLength={5000} />
                    </Form.Item>
                  );
                }
                return null;
              })}

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit Metadata
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Card>
      </Space>
    </div>
  );
};

export default DynamicFormBuilder;
