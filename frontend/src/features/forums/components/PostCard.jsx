import { useNavigate } from "react-router";
import TimeAgo from "../../../components/TimeAgo";

export default function PostCard({ post }) {
  const navigate = useNavigate();

  return (
    <li
      className="postCard"
      onClick={() => navigate("/posts/" + post.id)}
      tabIndex={0}
      role="button"
      aria-pressed="false"
    >
      <div className="postCardTitle">
        <h3>{post.title}</h3>
        <div className="postCardByLine">
          <span className="postCardUser">{post.account.username}</span>
          <TimeAgo timeStamp={new Date(post.created_at)} />
        </div>
      </div>
      <div className="postCardStats">
        <span className="postCardStat">{post.replies} Replies</span>
        <span className="postCardStat">{0} Views</span>
      </div>
    </li>
  );
}
