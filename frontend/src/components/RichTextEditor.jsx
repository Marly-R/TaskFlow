
import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { Extension } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import "./RichTextEditor.css";

const FontSize = Extension.create({
    name: "fontSize",

    addGlobalAttributes() {
        return [
            {
                types: ["textStyle"],
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: (element) => element.style.fontSize || null,
                        renderHTML: (attributes) => {
                            if (!attributes.fontSize) return {};

                            return {
                                style: `font-size: ${attributes.fontSize}`
                            };
                        }
                    }
                }
            }
        ];
    }
});

function RichTextEditor({ value, onChange }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextStyle,
            FontSize
        ],
        content: value || "",
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "rich-text-content",
                "aria-label": "Descripción de la tarea"
            }
        }
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value || "", { emitUpdate: false });
        }
    }, [editor, value]);

    if (!editor) return null;

    const cambiarTamano = (tamano) => {
        if (!tamano) {
            editor.chain().focus().setMark("textStyle", { fontSize: null }).removeEmptyTextStyle().run();
            return;
        }

        editor.chain().focus().setMark("textStyle", { fontSize: tamano }).run();
    };

    return (
        <div className="rich-text-editor">
            <div className="rich-text-toolbar">
                <button
                    type="button"
                    className={editor.isActive("bold") ? "active" : ""}
                    title="Negrita"
                    aria-label="Negrita"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    <strong>B</strong>
                </button>

                <button
                    type="button"
                    className={editor.isActive("italic") ? "active" : ""}
                    title="Cursiva"
                    aria-label="Cursiva"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    <em>I</em>
                </button>

                <button
                    type="button"
                    className={editor.isActive("underline") ? "active" : ""}
                    title="Subrayado"
                    aria-label="Subrayado"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                >
                    <u>U</u>
                </button>

                <span className="rich-text-divider" />

                <button
                    type="button"
                    title="Título"
                    aria-label="Título"
                    className={editor.isActive("heading", { level: 2 }) ? "active" : ""}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                >
                    H
                </button>

                <button
                    type="button"
                    title="Lista con viñetas"
                    aria-label="Lista con viñetas"
                    className={editor.isActive("bulletList") ? "active" : ""}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                >
                    • ≡
                </button>

                <button
                    type="button"
                    title="Lista numerada"
                    aria-label="Lista numerada"
                    className={editor.isActive("orderedList") ? "active" : ""}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                >
                    1.
                </button>

                <span className="rich-text-divider" />

                <select
                    className="rich-text-size"
                    aria-label="Tamaño de letra"
                    title="Tamaño de letra"
                    value={editor.getAttributes("textStyle").fontSize || ""}
                    onChange={(evento) => cambiarTamano(evento.target.value)}
                >
                    <option value="">Tamaño</option>
                    <option value="12px">Pequeña</option>
                    <option value="14px">Normal</option>
                    <option value="18px">Grande</option>
                    <option value="24px">Muy grande</option>
                </select>

                <span className="rich-text-divider" />

                <button
                    type="button"
                    title="Deshacer"
                    aria-label="Deshacer"
                    disabled={!editor.can().undo()}
                    onClick={() => editor.chain().focus().undo().run()}
                >
                    ↶
                </button>

                <button
                    type="button"
                    title="Rehacer"
                    aria-label="Rehacer"
                    disabled={!editor.can().redo()}
                    onClick={() => editor.chain().focus().redo().run()}
                >
                    ↷
                </button>
            </div>

            <EditorContent editor={editor} />

            <div className="rich-text-footer">
                Puedes dejar la descripción vacía.
            </div>
        </div>
    );
}

export default RichTextEditor;
