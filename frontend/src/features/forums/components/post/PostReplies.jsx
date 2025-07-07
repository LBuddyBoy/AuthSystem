import useQuery from "../../../../hooks/useQuery";
import Loading from "../../../../components/Loading";
import TimeAgo from "../../../../components/TimeAgo";
import { useAccount } from "../../../../context/AccountContext";

export default function PostReplies({ post }) {
  const { loading, data: replies } = useQuery("/posts/" + post.id + "/replies");

  if (loading || !replies) return <Loading />;

  return (
    <section className="repliesSection">
      <header>
        <h2>Replies</h2>
      </header>
      <ul className="repliesList">
        {replies.map((reply) => (
          <li key={reply.id} className="replyCard">
            <div className="replyByLine">
              <img src={reply.account.avatar_url} alt="Reply User Avatar" />
              <span className="replyUser">{reply.account.username}</span>
              <TimeAgo timeStamp={new Date(reply.created_at)} />
            </div>
            <p className="replyMessage">{reply.message}</p>
            <ReplyButtons reply={reply} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function ReplyButtons({ reply }) {
  const { account, hasPermission } = useAccount();
  const editable = account && account.id === reply.account_id;

  if (!editable && !hasPermission("admin:panel")) {
    return <></>;
  }

  return (
    <div className="replyButtons">
      {editable && <button>Edit</button>}
      <button>Delete</button>
    </div>
  );
}
