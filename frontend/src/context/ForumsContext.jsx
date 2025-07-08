import { useContext, createContext, useState } from "react";
import useQuery from "../hooks/useQuery";
import Loading from "../components/Loading";

const ForumsContext = createContext();

export function ForumsProvider({ children }) {
  const { loading, error, data: forums } = useQuery("/forums", "forums");
  const [editing, setEditing] = useState();

  if (loading || !forums) return <Loading></Loading>;


  const exports = {
    editing,
    setEditing,
    forums
  };

  return (
    <ForumsContext.Provider value={exports}>{children}</ForumsContext.Provider>
  );
}

export function useForums() {
  const context = useContext(ForumsContext);

  if (!context) throw new Error("useForums must be used within ForumsProvider");

  return context;
}
