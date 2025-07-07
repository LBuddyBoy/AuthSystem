import { useParams } from "react-router";
import useQuery from "../../../hooks/useQuery";
import Loading from "../../../components/Loading";
import TimeAgo from "../../../components/TimeAgo";

export default function PostReplies() {
  const { id } = useParams();
  const { loading, data: replies } = useQuery("/posts/" + id + "/replies");

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
          </li>
        ))}
      </ul>
    </section>
  );
}
