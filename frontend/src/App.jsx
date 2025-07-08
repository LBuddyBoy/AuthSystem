import { Link } from "react-router";
import "./App.css";
import Loading from "./components/Loading";
import useQuery from "./hooks/useQuery";
import TimeAgo from "./components/TimeAgo";
import { useAccount } from "./context/AccountContext";

export default function App() {
  const {
    data: stats,
    loading: statsLoading,
    error: statsError,
  } = useQuery("/admin/stats", "stats");
  const {
    data: posts,
    loading: postsLoading,
    error: postsError,
  } = useQuery("/posts/latest/5", "posts");

  const { account, hasPermission } = useAccount();

  if (statsLoading || !stats || postsLoading || !posts)
    return <Loading></Loading>;

  return (
    <div className="homeContainer">
      {/* 1. Greeting */}
      <header className="homeHeader">
        {account ? (
          <>
            <h1>Welcome back, {account.username}!</h1>
            <p>Look around, see if you find anything you like</p>
          </>
        ) : (
          <>
            <h1>Welcome!</h1>
            <p>
              Don't have an account?{" "}
              <Link to={"/signup"}>Create an account here!</Link>
            </p>
          </>
        )}
      </header>

      {/* 2. Quick Links */}
      <nav className="quickLinks">
        <Link to="/forums">Forums</Link>
        {account ? (
          <>
            <Link to="/my-posts">My Posts</Link>
            <Link to="/account">Settings</Link>
            {hasPermission("admin:panel") && (
              <Link to="/admin">Admin Panel</Link>
            )}
          </>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>

      {/* 3. Latest Activity */}
      <section className="latestActivity">
        <h2>Latest Forum Posts</h2>
        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
                <span>
                  by {post.account.username} •{" "}
                  <TimeAgo timeStamp={new Date(post.created_at)} />
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="shortcuts">
        <Link to={"/forums"}>View All Forums</Link>
      </div>

      {/* 5. Stats */}
      <aside className="homeStats">
        <p>Members: {stats.accounts}</p>
        <p>Posts: {stats.posts}</p>
        <p>Replies: {stats.replies}</p>
      </aside>
    </div>
  );
}
