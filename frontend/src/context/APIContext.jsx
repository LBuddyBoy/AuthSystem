import { useContext, createContext, useState } from "react";
import { useAccount } from "./AccountContext";

export const API = "http://localhost:5000";

const APIContext = createContext();

export function APIProvider({ children }) {
  const [tags, setTags] = useState({});
  const { token } = useAccount();
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const request = async (resource, options) => {
    const response = await fetch(API + resource, {
      ...options,
      headers,
    });
    const isJson = /json/.test(response.headers.get("Content-Type"));
    const result = isJson ? await response.json() : undefined;
    if (!response.ok) throw Error(result?.message ?? "Something went wrong :(");
    return result;
  };

  /** Stores the provided query function for a given tag */
  const provideTag = (tag, query) => {
    setTags({ ...tags, [tag]: query });
  };

  /** Calls all query functions associated with the given tags */
  const invalidateTags = (tagsToInvalidate) => {
    tagsToInvalidate.forEach((tag) => {
      const query = tags[tag];
      if (query) query();
    });
  };

  const value = { request, provideTag, invalidateTags };
  return <APIContext.Provider value={value}>{children}</APIContext.Provider>;
}

export function useAPI() {
  const context = useContext(APIContext);

  if (!context) throw new Error("useAPI must be used within the APIProvider");

  return context;
}
