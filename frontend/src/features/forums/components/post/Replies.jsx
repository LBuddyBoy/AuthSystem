import useQuery from "../../../../hooks/useQuery";
import Loading from "../../../../components/Loading";
import ReplyCard from "./ReplyCard";

export default function Replies({ post }) {
  const { loading, data: replies } = useQuery("/posts/" + post.id + "/replies", "replies");

  if (loading || !replies) return <Loading />;

  return (
    <section className="repliesSection">
      <header>
        <h2>Replies</h2>
      </header>
      <ul className="repliesList">
        {replies.map((reply) => (
          <ReplyCard key={reply.id} reply={reply}/>
        ))}
      </ul>
    </section>
  );
}
