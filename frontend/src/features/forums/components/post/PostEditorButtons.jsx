import { useCurrentEditor } from "@tiptap/react";
import { useForums } from "../../../../context/ForumsContext";

export default function PostEditorButtons({ post }) {
  const { setEditing, updatePost } = useForums();
  const { editor } = useCurrentEditor();

  const stopEditing = (e) => {
    e.preventDefault();
    setEditing(false);
  };

  const saveChanges = async (e) => {
    try {
      await updatePost({
        id: post.id,
        payload: {
          body: editor.getHTML()
        }
      });
      setEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button className="cancelBtn" onClick={stopEditing}>
        Cancel
      </button>
      <button className="saveBtn" onClick={saveChanges}>
        Save
      </button>
    </>
  );
}