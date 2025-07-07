import { useContext, createContext, useState } from "react";
import useQuery from "../hooks/useQuery";
import Loading from "../components/Loading";
import { API } from "./AccountContext";

const ForumsContext = createContext();

export function ForumsProvider({ children }) {
  const { loading, error, data: forums } = useQuery("/forums");
  const [editing, setEditing] = useState();

  if (loading || !forums) return <Loading></Loading>;

  const updatePost = async ({id, payload}) => {
    const response = await fetch(`${API}/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result);
    }

    return result;
  }

  const exports = {
    updatePost,
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
