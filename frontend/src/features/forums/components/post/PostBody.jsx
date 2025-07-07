import { useForums } from "../../../../context/ForumsContext";
import { useAccount } from "../../../../context/AccountContext";
import MenuBar from "../../../../components/MenuBar";
import PostEditorButtons from "./PostEditorButtons";

export default function PostBody({ post }) {
  const { account, hasPermission } = useAccount();
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
      {account && (account.id === post.account.id || hasPermission("admin:panel")) && <PostButtons />}
    </div>
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
