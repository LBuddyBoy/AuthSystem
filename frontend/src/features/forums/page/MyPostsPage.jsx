import Loading from "../../../components/Loading";
import useQuery from "../../../hooks/useQuery";
import { Link } from "react-router";
import "../style/myPosts.css";

// Helper to strip HTML tags
function stripHtml(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

export default function MyPostsPage() {
  const { data: posts, loading, error } = useQuery("/posts/me", "posts");

  if (loading || !posts) return <Loading />;
  if (error) return <div className="errorMsg">Something went wrong.</div>;

  return (
    <div className="myPostsPage">
      <header className="myPostsHeader">
        <h1>My Posts</h1>
        <Link className="newPostBtn" to="/create-post">+ New Post</Link>
      </header>

      {posts.length === 0 ? (
        <div className="emptyState">
          <p>You haven’t posted anything yet!</p>
          <Link className="newPostCta" to="/create-post">Create your first post</Link>
        </div>
      ) : (
        <ul className="myPostsList">
          {posts.map(post => {
            const snippet = stripHtml(post.body);
            const preview = snippet.length > 160 ? snippet.slice(0, 160) + "…" : snippet;

            return (
              <li key={post.id} className="myPostCard">
                <div className="myPostInfo">
                  <Link className="myPostTitle" to={`/forums/${post.id}`}>
                    {post.title}
                  </Link>
                  <div className="myPostMeta">
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="myPostSnippet">{preview}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
