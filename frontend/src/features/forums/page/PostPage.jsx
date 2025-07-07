import { useParams } from "react-router";
import useQuery from "../../../hooks/useQuery";
import Loading from "../../../components/Loading";
import TimeAgo from "../../../components/TimeAgo";
import PostReplies from "../components/PostReplies";
import "../style/postPage.css";
import { useAccount } from "../../../context/AccountContext";
import { useForums } from "../../../context/ForumsContext";
import MenuBar from "../../../components/MenuBar";
import { useCurrentEditor } from "@tiptap/react";

export default function PostPage() {
  const { id } = useParams();
  const { editing } = useForums();
  const { loading, data: post } = useQuery("/posts/" + id, [editing]);

  if (loading || !post) return <Loading></Loading>;

  return (
    <div className={`postPage${editing ? " editing" : ""}`}>
      <PostHeader post={post} />
      <PostBody post={post} />
      <PostReplies />
    </div>
  );
}

function PostHeader({ post }) {
  const { editing } = useForums();

  return (
    <header>
      {editing ? (
        <input name="title" defaultValue={post.title} type="text"></input>
      ) : (
        <h1>{post.title}</h1>
      )}
      <div className="postByLine">
        <img src={post.account.avatar_url} alt="Post image" />
        <p>{post.account.username}</p>
        <TimeAgo timeStamp={new Date(post.created_at)}></TimeAgo>
      </div>
    </header>
  );
}

function PostBody({ post }) {
  const { account } = useAccount();
  const { editing } = useForums();

  return (
    <div className="postBody">
      {editing ? (
        <MenuBar content={post.body}>
          <PostEditorButtons post={post} />
        </MenuBar>
      ) : (
        <div
          className="postBodyContent"
          dangerouslySetInnerHTML={{ __html: post.body }}
        ></div>
      )}
      {account && account.id === post.account.id && <PostButtons />}
    </div>
  );
}

function PostEditorButtons({ post }) {
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

function PostButtons() {
  const { editing, setEditing } = useForums();

  const startEditing = (e) => {
    e.preventDefault();
    setEditing(true);
  };

  return (
    <div className="postButtons">
      {!editing && (
        <>
          <button className="editBtn" onClick={startEditing}>
            Edit
          </button>
          <button className="deleteBtn">Delete</button>
        </>
      )}
    </div>
  );
}
