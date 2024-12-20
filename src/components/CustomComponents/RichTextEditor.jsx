import { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { editorFontSizeFormats, RichTextEditorPlugins } from "../../utils/constants";

const RichTextEditor = ({ handleEditorChange, description }) => {
  const [isEditorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    // Set a timeout to load the editor after 2 seconds
    const timer = setTimeout(() => {
      setEditorLoaded(true);
    }, 2000);

    // Clear the timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  const getEditorPlugins = () => {
    return [
      RichTextEditorPlugins.AUTOLINK,
      RichTextEditorPlugins.LISTS,
      RichTextEditorPlugins.LINK,
      RichTextEditorPlugins.ANCHOR,
      RichTextEditorPlugins.WORD_COUNT,
      // RichTextEditorPlugins.AUTOCOMPLETE,
      RichTextEditorPlugins.TABLE
    ];
  };

  const editorPlugins = getEditorPlugins();

  const insertVariable = (editor, variable) => {
    editor.execCommand("mceInsertContent", false, `<span class="variable">${variable}</span>`);
  };

  return (
    <div>
      {isEditorLoaded ? (
        <Editor
          tinymceScriptSrc="/tinymce/js/tinymce/tinymce.min.js"
          init={{
            font_size_formats: editorFontSizeFormats,
            height: 400,
            menubar: true,
            selector: 'textarea',
            paste_as_text: false,
            paste_word_valid_elements: 'b,strong,i,em,h1,h2,h3,p,ul,ol,li',
            paste_data_images: true,
            plugins: editorPlugins,
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
            setup: function (editor) {
              // Add the insertVariable button
              editor.ui.registry.addButton('insertVariables', {
                text: 'Insert Variable',
                onAction: function () {
                  const variable = prompt('Enter variable name (e.g., name, date)');
                  if (variable) {
                    editor.insertContent(`{{${variable}}}`);
                  }
                }
              });
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
          value={description} // Ensure this is bound to state
          onEditorChange={handleEditorChange} // Update state on change
        />
      ) : (
        <div>Loading editor...</div> // Show a loading message before editor is loaded
      )}
    </div>
  );
};

export default RichTextEditor;
