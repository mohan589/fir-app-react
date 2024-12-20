import React, { useState } from "react";
import { Button, Form, Input, Space } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { RichTextEditorPlugins } from "../../utils/constants";

const editorFontSizeFormats = '8px 10px 12px 14px 18px 24px 36px';
const buyerPageLinkRegexPattern = /\/dealcentre\/marketing\/links\/[^/]+/;

const TextExtract = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
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

  // Replace variables (placeholders like {{name}}) in the editor content
  const handleSave = () => {
    let content = formData.description;

    // Example of replacing {{name}} with the actual name
    content = content.replace(/{{name}}/g, formData.name);
    content = content.replace(/{{date}}/g, new Date().toLocaleDateString());

    console.log("Saved content:", content); // You can save this content or send it to an API
  };

  const handleCancel = () => {
    setFormData({ name: "", description: "" });
  };

  const getEditorPlugins = () => {
    return [
      RichTextEditorPlugins.AUTOLINK,
      RichTextEditorPlugins.LISTS, RichTextEditorPlugins.LINK,
      RichTextEditorPlugins.ANCHOR, RichTextEditorPlugins.WORD_COUNT, RichTextEditorPlugins.AUTOCOMPLETE,
      RichTextEditorPlugins.TABLE
    ];
  };

  const editorPlugins = getEditorPlugins();

  const insertVariable = (editor, variable) => {
    editor.execCommand("mceInsertContent", false, `<span class="variable">${variable}</span>`);
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

        {/* Description (TinyMCE Editor) */}
        <Form.Item label="Description" required>
          <Editor
            tinymceScriptSrc="/tinymce/js/tinymce/tinymce.min.js"
            init={{
              font_size_formats: editorFontSizeFormats,
              height: 400,
              menubar: true,
              // plugins: editorPlugins,
              scriptLoading: "both",
              toolbar:
                "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code",
              external_plugins: {},
              font_css: "/tinymce/js/tinymce/skins/ui/oxide/skin.min.css",
              content_css: "/tinymce/js/tinymce/skins/content/document/writer/content.min.css",
              init_instance_callback: (editor) => {
                const anchorElements = editor.dom.select('a');
                if (anchorElements && anchorElements.length > 0) {
                  anchorElements.forEach((anchorElement) => {
                    const documentLinkVariableElement = () => {
                      const documentLinkVariable = editor.dom.create('span');
                      editor.dom.setAttrib(documentLinkVariable, 'class', 'variable');
                      editor.dom.setAttrib(documentLinkVariable, 'contenteditable', 'false');
                      editor.dom.setHTML(documentLinkVariable, '/Name');
                      return documentLinkVariable;
                    };
                    editor.dom.replace(documentLinkVariableElement(), anchorElement);
                  });
                }
              },
              content_style: `
                span.variable {
                  background-color: #ffffcc;
                  color: #333;
                  padding: 2px 4px;
                  border-radius: 4px;
                  font-weight: bold;
                }
              `,
            }}
            value={formData.description} // Ensure this is bound to state
            onEditorChange={handleEditorChange} // Update state on change
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

export default TextExtract;
