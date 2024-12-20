import { Editor } from "@tinymce/tinymce-react";
import { editorFontSizeFormats, RichTextEditorPlugins } from "../../utils/constants";

const RichTextEditor = ({ handleEditorChange, description}) => {
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

  return (<Editor
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
    value={description} // Ensure this is bound to state
    onEditorChange={handleEditorChange} // Update state on change
  />)
}

export default RichTextEditor;