import { useNavigate } from "react-router";
import Button from "../../components/Button";
import { useForums } from "../../context/ForumsContext";
import ForumCard from "./components/ForumCard";
import "./forums.css";
import { useAccount } from "../../context/AccountContext";

export default function Forums() {
  const { forums } = useForums();
  const { account } = useAccount();
  const navigate = useNavigate();

  return (
    <div className="forumsContainer">
      <header className="forumsHeader">
        <h1>Forums</h1>
        {account && (
          <Button
            id={"createPost"}
            text={"Create Post"}
            action={() => navigate(`/create-post`, { replace: true })}
          />
        )}
      </header>
      <ul className="forumCards">
        {forums.map((forum) => (
          <ForumCard key={forum.id} forum={forum} />
        ))}
      </ul>
    </div>
  );
}
