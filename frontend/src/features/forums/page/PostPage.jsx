import { useParams } from "react-router";
import useQuery from "../../../hooks/useQuery";
import Loading from "../../../components/Loading";
import Replies from "../components/post/Replies";
import "../style/postPage.css";
import { useForums } from "../../../context/ForumsContext";
import PostHeader from "../components/post/PostHeader";
import PostBody from "../components/post/PostBody";
import CreateReply from "../components/post/CreateReply";

export default function PostPage() {
  const { id } = useParams();
  const { editing } = useForums();
  const { loading, data: post } = useQuery("/posts/" + id, "post");

  if (loading || !post) return <Loading></Loading>;

  return (
    <div className={`postPage${editing ? " editing" : ""}`}>
      <PostHeader post={post} />
      <PostBody post={post} />
      <CreateReply post={post} />
      <Replies post={post} />
    </div>
  );
}
