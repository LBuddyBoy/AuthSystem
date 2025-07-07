import { useNavigate } from "react-router";

export default function ForumCard({ forum }) {
  const navigate = useNavigate();

  return (
    <li
      className="forumCard"
      onClick={() => navigate("/forums/" + forum.id)}
      tabIndex={0}
      role="button"
      aria-pressed="false"
    >
      <span className="forumName">{forum.name}</span>
      <span className="forumStat">{forum.posts} Posts</span>
      <span className="forumStat">{forum.replies} Replies</span>
    </li>
  );
}
