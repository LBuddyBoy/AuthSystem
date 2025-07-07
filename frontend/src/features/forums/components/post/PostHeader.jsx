import TimeAgo from "../../../../components/TimeAgo";
import { useForums } from "../../../../context/ForumsContext";

export default function PostHeader({ post }) {
  const { editing } = useForums();

  return (
    <header>
      {editing ? (
        <input name="title" defaultValue={post.title} type="text"></input>
      ) : (
        <h1>{post.title}</h1>
      )}
      <div className="postByLine">
        <img src={post.account.avatar_url} alt="Post Avatar" />
        <p>{post.account.username}</p>
        <TimeAgo timeStamp={new Date(post.created_at)}></TimeAgo>
      </div>
    </header>
  );
}