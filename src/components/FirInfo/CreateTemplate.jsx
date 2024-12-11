import React, { useMemo, useState, useEffect } from "react";
import { Button, Input, Space, Card, notification, Form } from "antd";
import { SwapOutlined, PlusOutlined } from "@ant-design/icons";

const Context = React.createContext({
  name: 'Default',
});

const CreateTemplate = ({ existingTemplateData }) => {
  const [templateName, setTemplateName] = useState("");
  const [fields, setFields] = useState([{ id: Date.now(), value: "" }]);

  // Notification hook
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement) => {
    api.info({
      message: `Notification ${placement}`,
      description: "Template saved successfully!",
      placement,
    });
  };

  const contextValue = useMemo(
    () => ({
      name: 'Ant Design',
    }),
    [],
  );

  // Handle template name change
  const handleTemplateNameChange = (e) => setTemplateName(e.target.value);

  // Handle field change
  const handleFieldChange = (id, value) => {
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, value } : field
    );
    setFields(updatedFields);
  };

  // Add new field
  const addField = () => {
    setFields([...fields, { id: Date.now(), value: "" }]);
  };

  // Swap two rows
  const swapRows = (index1, index2) => {
    const updatedFields = [...fields];
    const temp = updatedFields[index1];
    updatedFields[index1] = updatedFields[index2];
    updatedFields[index2] = temp;
    setFields(updatedFields);
  };

  // Bind existing template data (if available)
  useEffect(() => {
    if (existingTemplateData) {
      setTemplateName(existingTemplateData.templateName || "");
      setFields(
        existingTemplateData.fields || [{ id: Date.now(), value: "" }]
      );
    }
  }, [existingTemplateData]);

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

    console.log("Template Saved:", { templateName, fields });
    openNotification('topLeft');
  };

  return (
    <div style={{ padding: "24px", maxWidth: "800px", margin: "auto" }}>
      <Context.Provider value={contextValue}>
        {contextHolder} {/* Ensure the notification context holder is rendered */}
        <Card title="Create Template" bordered={false} style={{ backgroundColor: "#f9fafb" }}>
          <Form
            onFinish={handleSave} // Form submission trigger
            layout="vertical"
          >
            {/* Template Name */}
            <Form.Item
              label="Template Name"
              name="templateName"
              rules={[
                { required: true, message: "Please input the template name!" },
              ]}
            >
              <Input
                placeholder="Enter template name"
                value={templateName}
                onChange={handleTemplateNameChange}
                style={{
                  marginTop: "8px",
                  borderRadius: "4px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Form.Item>

            {/* Dynamic Fields */}
            <div>
              <label style={{ fontWeight: "bold" }}>Fields:</label>
              <div style={{ marginTop: "8px", maxHeight: "300px", overflowY: "auto" }}>
                {fields.map((field, index) => (
                  <Space
                    key={field.id}
                    align="center"
                    style={{
                      display: "flex",
                      marginBottom: "8px",
                      cursor: "pointer",
                      border: "1px solid #e8e8e8",
                      padding: "8px",
                      borderRadius: "8px",
                      backgroundColor: "#fff",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("index", index);
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                    }}
                    onDrop={(e) => {
                      const draggedIndex = e.dataTransfer.getData("index");
                      if (draggedIndex !== index) {
                        swapRows(Number(draggedIndex), index);
                      }
                    }}
                  >
                    {/* Row Swap Icon (For all fields, including last one) */}
                    {index < fields.length && (
                      <Button
                        icon={<SwapOutlined />}
                        onClick={() => swapRows(index, index + 1)} // Swap with the next field
                        shape="circle"
                        style={{
                          borderColor: "#1890ff",
                          color: "#1890ff",
                          marginRight: "8px",
                        }}
                      />
                    )}

                    {/* Field Input */}
                    <Input
                      placeholder={`Field ${index + 1}`}
                      value={field.value}
                      onChange={(e) => handleFieldChange(field.id, e.target.value)}
                      style={{ flex: 1 }}
                    />

                    {/* Add Field Button (only on the last field) */}
                    {index === fields.length - 1 && (
                      <Button
                        type="dashed"
                        icon={<PlusOutlined />}
                        onClick={addField}
                        style={{ marginLeft: "8px" }}
                      />
                    )}
                  </Space>
                ))}
              </div>
            </div>

            {/* Save Template Button */}
            <div style={{ marginTop: "24px", textAlign: "center" }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  fontSize: "16px",
                }}
              >
                Save Template
              </Button>
            </div>
          </Form>
        </Card>
      </Context.Provider>
    </div>
  );
};

export default CreateTemplate;
