import { useForums } from "../../context/ForumsContext";
import ForumCard from "./components/ForumCard";
import "./forums.css";

export default function Forums() {
  const { forums } = useForums();

  return (
    <div className="forumsContainer">
      <header className="forumsHeader">
        <h1>Forums</h1>
      </header>
      <ul className="forumCards">
        {forums.map((forum) => (
          <ForumCard key={forum.id} forum={forum} />
        ))}
      </ul>
    </div>
  );
}
