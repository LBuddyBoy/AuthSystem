import { useCurrentEditor } from "@tiptap/react";
import MenuBar from "./MenuBar";

const DEFAULT_CONTENT = `Hello World`;

const Tiptap = () => {
  return (
    <div
      style={{
        margin: "150px",
      }}
    >
      <MenuBar content={DEFAULT_CONTENT}>
        <Content/>
      </MenuBar>
    </div>
  );
};

const Content = () => {
  const { editor } = useCurrentEditor();

  const handleClick = (e) => {

  };

  return (
    <>
      <button onClick={handleClick}>Save</button>
      <div className="preview" dangerouslySetInnerHTML={{__html: editor.getHTML()}}>

      </div>
    </>
  );
};

export default Tiptap;
