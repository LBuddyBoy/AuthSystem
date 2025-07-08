import { useNavigate } from "react-router";
import useMutation from "../../../hooks/useMutation";
import MenuBar from "../../../components/MenuBar";
import { useCurrentEditor } from "@tiptap/react";
import { useState } from "react";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import "../style/createPost.css";
import { useForums } from "../../../context/ForumsContext";

export default function CreatePostPage() {
  const { forums } = useForums();
  const [error, setError] = useState();
  const [title, setTitle] = useState();
  const [forumId, setForumId] = useState(-1);

  if (!forums || forums.length === 0) {
    return <Error error={"Couldn't find any forums to post on."}></Error>;
  }

  console.log(forumId);

  return (
    <form className="postCreation">
      <header>
        <h1>Create a Post</h1>
        {error && <Error error={error}></Error>}
      </header>
      <label>
        Forum
        <select defaultValue={-1} onChange={(e) => setForumId(e.target.value)}>
          <option value={-1}>None</option>
          {forums.map((forum) => {
            return (
              <option key={forum.id} value={forum.id}>
                {forum.name}
              </option>
            );
          })}
        </select>
      </label>
      <label>
        Title
        <input
          name="title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>Body</label>
      <MenuBar content={""}>
        <Buttons title={title} forumId={forumId} setError={setError} />
      </MenuBar>
    </form>
  );
}

function Buttons({ title, forumId, setError }) {
  const { editor } = useCurrentEditor();
  const navigate = useNavigate();
  const { mutate, loading } = useMutation("/posts", "POST", [
    "forum",
    "forums",
    "posts",
  ]);

  const handleSave = async (e) => {
    e.preventDefault();
    const body = editor.getText();

    if (!title || title === null || title === "") {
      setError("Please make sure you provide a valid title.");
      return;
    }

    if (!body || body === null || body === "") {
      setError("Please make sure you provide a valid body.");
      return;
    }

    if (forumId === -1) {
      setError("Please select a forum to post under.");
      return;
    }

    await mutate({
      title: title,
      body: editor.getHTML(),
      forum_id: forumId,
    })
      .then((result) => {
        navigate("/posts/" + result.id, {
          replace: true,
        });
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    navigate("/forums");
  };

  return (
    <div className="postCreationButtons">
      {loading ? (
        <Loading />
      ) : (
        <>
          <button className="cancelBtn" onClick={handleCancel}>
            Cancel
          </button>
          <button className="saveBtn" onClick={handleSave}>
            Save
          </button>
        </>
      )}
    </div>
  );
}
