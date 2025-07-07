import { useCurrentEditor } from "@tiptap/react";
import { useForums } from "../../../../context/ForumsContext";
import useMutation from "../../../../hooks/useMutation";

export default function PostEditorButtons({ post }) {
  const { setEditing } = useForums();
  const { editor } = useCurrentEditor();
  const { mutate, loading, error, data } = useMutation(
    `/posts/${post.id}`,
    "PUT",
    ["post"]
  );

  const stopEditing = (e) => {
    e.preventDefault();
    setEditing(false);
  };

  const saveChanges = async (e) => {
    try {
      await mutate({
        id: post.id,
        body: editor.getHTML(),
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
