import "./style/menubar.css";
import { useRef, useState } from "react";
import { EditorContent, EditorProvider, useCurrentEditor } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import UploadImage from "tiptap-extension-upload-image";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import FontFamily from "@tiptap/extension-font-family";
import TextAlign from "@tiptap/extension-text-align";
import { readFileAsync } from "../util/fileReader";

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: { keepMarks: true, keepAttributes: false },
    orderedList: { keepMarks: true, keepAttributes: false },
  }),
  UploadImage.configure({
    uploadFn: async (file) => await readFileAsync({ file }),
  }),
  Underline,
  Link.configure({
    openOnClick: true,
    autolink: true,
    linkOnPaste: true,
    HTMLAttributes: {
      style: "",
    },
  }),
  Highlight,
  FontFamily.configure({
    types: ["textStyle"],
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
    defaultAlignment: "left",
  }),
];

const HEADING_OPTIONS = [
  { label: "¶", value: "paragraph" },
  ...Array.from({ length: 6 }, (_, i) => ({
    label: `H${i + 1}`,
    value: i + 1,
  })),
];

const COLOR_OPTIONS = [
  { label: "🖤", value: "" },
  { label: "🟥", value: "#e64848" },
  { label: "🟩", value: "#33eb67" },
  { label: "🟦", value: "#3b82f6" },
  { label: "🟣", value: "#958DF1" },
  { label: "🟧", value: "#f59e42" },
];

const BLOCK_OPTIONS = [
  { label: "¶", value: "paragraph" },
  { label: "•", value: "bulletList" },
  { label: "1️⃣", value: "orderedList" },
  { label: "🧑‍💻", value: "codeBlock" },
  { label: "❝", value: "blockquote" },
];

const FONT_OPTIONS = [
  { label: "Aa", value: "" },
  { label: "Serif", value: "serif" },
  { label: "Mono", value: "monospace" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Comic", value: "'Comic Sans MS', cursive, sans-serif" },
  { label: "Courier", value: "'Courier New', Courier, monospace" },
  { label: "Inter", value: "Inter, sans-serif" },
  { label: "Roboto", value: "Roboto, Arial, sans-serif" },
  { label: "Times", value: "'Times New Roman', Times, serif" },
];

const EditorBar = () => {
  const { editor } = useCurrentEditor();
  const headingRef = useRef();
  const colorRef = useRef();
  const fontRef = useRef();
  const [linkUnderline, setLinkUnderline] = useState(true);

  if (!editor) return null;

  let currentHeading = "paragraph";
  for (let i = 1; i <= 6; i++) {
    if (editor.isActive("heading", { level: i })) {
      currentHeading = i;
      break;
    }
  }
  if (editor.isActive("paragraph")) currentHeading = "paragraph";

  function handleHeadingChange(e) {
    const val = e.target.value;
    if (val === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else {
      editor
        .chain()
        .focus()
        .toggleHeading({ level: Number(val) })
        .run();
    }
    headingRef.current?.blur();
  }

  const currentColor =
    COLOR_OPTIONS.find((c) => editor.isActive("textStyle", { color: c.value }))
      ?.value || "";

  function handleColorChange(e) {
    const color = e.target.value;
    editor
      .chain()
      .focus()
      .setColor(color || null)
      .run();
    colorRef.current?.blur();
  }

  const currentFont =
    FONT_OPTIONS.find((c) =>
      editor.isActive("textStyle", { fontFamily: c.value })
    )?.value || "";

  function handleFontChange(e) {
    const font = e.target.value;
    editor
      .chain()
      .focus()
      .setFontFamily(font || null)
      .run();
    fontRef.current?.blur();
  }

  const getCurrentBlock = () => {
    if (editor.isActive("bulletList")) return "bulletList";
    if (editor.isActive("orderedList")) return "orderedList";
    if (editor.isActive("codeBlock")) return "codeBlock";
    if (editor.isActive("blockquote")) return "blockquote";
    return "paragraph";
  };

  function toggleLinkUnderline() {
    setLinkUnderline((u) => !u);
    if (editor.isActive("link")) {
      const attrs = editor.getAttributes("link");
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({
          ...attrs,
          style: linkUnderline ? "text-decoration:none" : "",
        })
        .run();
    }
  }

  return (
    <div className="tiptap">
      <div className="tiptap-toolbar">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
          title="Bold"
        >
          <b>B</b>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
          title="Italic"
        >
          <i>I</i>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is-active" : ""}
          title="Underline"
        >
          <u>U</u>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
          title="Strikethrough"
        >
          <span style={{ textDecoration: "line-through" }}>S</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={editor.isActive("highlight") ? "is-active" : ""}
          title="Highlight"
        >
          <span style={{ background: "#ffe47a", padding: "0 4px" }}>H</span>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "is-active" : ""}
          title="Inline Code"
        >
          {"</>"}
        </button>
        <select
          value={currentFont}
          onChange={handleFontChange}
          className="font-select"
          ref={fontRef}
          title="Font"
        >
          {FONT_OPTIONS.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              style={{ fontFamily: opt.value }}
            >
              {opt.label}
            </option>
          ))}
        </select>
        <select
          value={currentColor}
          onChange={handleColorChange}
          className="color-select"
          ref={colorRef}
          title="Color"
        >
          {COLOR_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <select
          value={currentHeading}
          onChange={handleHeadingChange}
          className="heading-select"
          ref={headingRef}
          title="Headings"
        >
          {HEADING_OPTIONS.map((h) => (
            <option key={h.value} value={h.value}>
              {h.label}
            </option>
          ))}
        </select>
        <select
          value={getCurrentBlock()}
          onChange={(e) => {
            const val = e.target.value;
            if (val === "bulletList")
              editor.chain().focus().toggleBulletList().run();
            else if (val === "orderedList")
              editor.chain().focus().toggleOrderedList().run();
            else if (val === "codeBlock")
              editor.chain().focus().toggleCodeBlock().run();
            else if (val === "blockquote")
              editor.chain().focus().toggleBlockquote().run();
            else editor.chain().focus().setParagraph().run();
          }}
          className="block-select"
          title="Blocks"
        >
          {BLOCK_OPTIONS.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>
        <label
          title="Insert Image"
          style={{ cursor: "pointer", marginBottom: 0 }}
        >
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (file) {
                const url = await readFileAsync({ file });
                editor.chain().focus().setImage({ src: url }).run();
                e.target.value = "";
              }
            }}
          />
          <span
            role="img"
            aria-label="Insert image"
            style={{ fontSize: 18, verticalAlign: "middle" }}
          >
            🖼️
          </span>
        </label>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
          title="Align Left"
        >
          ⬅️
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" }) ? "is-active" : ""
          }
          title="Align Center"
        >
          ↔️
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
          title="Align Right"
        >
          ➡️
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={
            editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
          }
          title="Justify"
        >
          🔳
        </button>
        <button
          onClick={() => {
            const prevUrl = editor.getAttributes("link").href || "";
            const prevStyle = editor.getAttributes("link").style || "";
            const url = prompt("Enter URL", prevUrl);
            if (url === null) return;
            if (url === "") editor.chain().focus().unsetLink().run();
            else
              editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .setLink({
                  href: url,
                  style: linkUnderline ? "" : "text-decoration:none",
                })
                .run();
          }}
          className={editor.isActive("link") ? "is-active" : ""}
          title="Add/Edit Link"
        >
          🔗
        </button>
        <button
          type="button"
          onClick={toggleLinkUnderline}
          className={!linkUnderline ? "is-active" : ""}
          title={linkUnderline ? "No Underline" : "Underline"}
        >
          {linkUnderline ? (
            <span style={{ textDecoration: "line-through" }}>U</span>
          ) : (
            <span>U</span>
          )}
        </button>
        <button
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          title="Clear marks"
        >
          🧹
        </button>
        <button
          onClick={() => editor.chain().focus().clearNodes().run()}
          title="Clear blocks"
        >
          🗑️
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          title="Horizontal rule"
        >
          ━
        </button>
        <button
          onClick={() => editor.chain().focus().setHardBreak().run()}
          title="Hard break"
        >
          ↵
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          title="Undo"
        >
          ⎌
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          title="Redo"
        >
          ↻
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default function MenuBar({ children, content }) {
  return (
    <EditorProvider
      slotBefore={<EditorBar />}
      extensions={extensions}
      content={content}
      autofocus={true}
    >
      {children}
    </EditorProvider>
  );
}
