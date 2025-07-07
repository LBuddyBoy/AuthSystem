import { useState } from "react";
import TimeAgo from "../../../../components/TimeAgo";
import { useAccount } from "../../../../context/AccountContext";
import useMutation from "../../../../hooks/useMutation";

export default function ReplyCard({ reply }) {
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState();

  return (
    <>
      <li key={reply.id} className="replyCard">
        <div className="replyByLine">
          <img src={reply.account.avatar_url} alt="Reply User Avatar" />
          <span className="replyUser">{reply.account.username}</span>
          <TimeAgo timeStamp={new Date(reply.created_at)} />
          {reply.has_been_edited && (
            <div className="replyEditInfo">
              Last Edited
              <TimeAgo timeStamp={new Date(reply.last_edited)} />
            </div>
          )}
        </div>
        {editing ? (
          <input
            name="replyMessage"
            className="replyMessageEdit"
            defaultValue={reply.message}
            onChange={(e) => setMessage(e.target.value)}
          />
        ) : (
          <p className="replyMessage">{reply.message}</p>
        )}
        <ReplyButtons
          reply={reply}
          message={message}
          editing={editing}
          setEditing={setEditing}
        />
      </li>
    </>
  );
}

function ReplyButtons({ reply, message, editing, setEditing }) {
  const { mutate, loading, error, data } = useMutation(
    `/replies/${reply.id}`,
    "PUT",
    ["replies"]
  );
  const { account, hasPermission } = useAccount();
  const editable = account && account.id === reply.account_id;

  const startEditing = () => {
    setEditing(true);
  };

  const stopEditing = () => {
    setEditing(false);
  };

  const saveEdits = async () => {
    await mutate({
      message,
    });
    console.log(data);
    setEditing(false);
  };

  if (!editable && !hasPermission("admin:panel")) {
    return <></>;
  }

  return (
    <div className="replyButtons">
      {editing ? (
        <>
          <button onClick={stopEditing}>Cancel</button>
          <button onClick={saveEdits}>Save</button>
        </>
      ) : (
        <>
          {editable && <button onClick={startEditing}>Edit</button>}
          <DeleteButton reply={reply} />
        </>
      )}
    </div>
  );
}

function DeleteButton({ reply }) {
  const { mutate, loading, error, data } = useMutation(
    `/replies/${reply.id}`,
    "DELETE",
    ["replies"]
  );

  const handleDelete = async (e) => {
    await mutate({});
  };

  return (
    <>
      <button onClick={handleDelete}>Delete</button>
    </>
  );
}
