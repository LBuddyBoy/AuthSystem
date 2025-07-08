import { useParams } from "react-router";
import useQuery from "../../../hooks/useQuery";
import Loading from "../../../components/Loading";
import PostCard from "../components/PostCard";
import "../style/forumPage.css";

export default function ForumPage() {
  const { id } = useParams();
  const { loading, data: forum } = useQuery("/forums/" + id, "forum");

  if (loading || !forum) return <Loading />;

  return (
    <div className="forumPageContainer">
      <header className="forumPageHeader">
        <h1>{forum.name}</h1>
        {forum.description && <p className="forumPageDescription">{forum.description}</p>}
      </header>
      <ForumPosts forum_id={forum.id} />
    </div>
  );
}

function ForumPosts({ forum_id }) {
  const { loading, data: posts } = useQuery("/forums/" + forum_id + "/posts", "posts");

  if (loading || !posts) return <Loading />;

  return (
    <section className="postsSection">
      <header>
        <h2>Posts</h2>
      </header>
      <ul className="postsList">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>
    </section>
  );
}
