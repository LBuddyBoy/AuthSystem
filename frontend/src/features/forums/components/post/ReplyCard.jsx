import TimeAgo from "../../../../components/TimeAgo";
import { useAccount } from "../../../../context/AccountContext";
import { useReply } from "../../../../context/ReplyContext";

export default function ReplyCard({ reply }) {
  const { isEditing, setMessage } = useReply();

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
        {isEditing(reply) ? (
          <input
            name="replyMessage"
            className="replyMessageEdit"
            defaultValue={reply.message}
            onChange={(e) => setMessage(e.target.value)}
          />
        ) : (
          <p className="replyMessage">{reply.message}</p>
        )}
        <ReplyButtons reply={reply} />
      </li>
    </>
  );
}

function ReplyButtons({ reply }) {
  const { isEditing, startEditing, stopEditing, saveEdits } = useReply();
  const { account, hasPermission } = useAccount();
  const editable = account && account.id === reply.account_id;

  if (!editable && (!account || !hasPermission("admin:panel"))) {
    return <></>;
  }

  return (
    <div className="replyButtons">
      {isEditing(reply) ? (
        <>
          <button onClick={() => stopEditing()}>Cancel</button>
          <button onClick={() => saveEdits()}>Save</button>
        </>
      ) : (
        <>
          {editable && <button onClick={() => startEditing(reply)}>Edit</button>}
          <DeleteButton reply={reply} />
        </>
      )}
    </div>
  );
}

function DeleteButton({ reply }) {
  const { handleDelete } = useReply();
  return (
    <>
      <button onClick={() => handleDelete(reply)}>Delete</button>
    </>
  );
}
