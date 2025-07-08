import useQuery from "../../../../hooks/useQuery";
import Loading from "../../../../components/Loading";
import ReplyCard from "./ReplyCard";
import { ReplyProvider } from "../../../../context/ReplyContext";
import "../../style/replies.css";

export default function Replies({ post }) {
  const { loading, data: replies } = useQuery(
    "/posts/" + post.id + "/replies",
    "replies"
  );

  if (loading || !replies) return <Loading />;

  return (
    <ReplyProvider>
      <section className="repliesSection">
        <header>
          <h2>Replies</h2>
        </header>
        <ul className="repliesList">
          {replies.length > 0 &&
            replies.map((reply) => <ReplyCard key={reply.id} reply={reply} />)}
        </ul>
        {replies.length === 0 && (
          <p className="noReplies">There are no replies yet.</p>
        )}
      </section>
    </ReplyProvider>
  );
}
