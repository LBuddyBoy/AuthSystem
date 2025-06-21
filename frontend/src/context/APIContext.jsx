import { createContext, useContext, useState } from "react";
import { useAccount } from "./AccountContext";

export const API = "http://localhost:5000";

const APIContext = createContext();

export function APIProvider({ children }) {
  const headers = { "Content-Type": "application/json" };
  const [tags, setTags] = useState({});
  const { token } = useAccount();

  if (token) headers["Authorization"] = `Bearer ${token}`;

  const request = async (path, body) => {
    const response = await fetch(`${API}${path}`, {
      ...body,
      headers,
    });
    const isJson = /json/.test(response.headers.get("Content-Type"));
    const result = isJson ? await response.json() : undefined;
    if (!response.ok) throw Error(result?.message ?? "Something went wrong :(");
    return result;
  };

  const updateTag = (tag, query) => {
    setTags({ ...tags, [tag]: query });
  };

  const invalidateTags = (tagsToInvalidate) => {
    tagsToInvalidate.forEach((tag) => {
      const query = tags[tag];

      if (query) query();
    });
  };

  const value = { request, updateTag, invalidateTags };

  return <APIContext.Provider value={value}>{children}</APIContext.Provider>;
}

export function useAPI() {
  const context = useContext(APIContext);

  if (!context)
    throw new Error("useAPI must be used from inside the APIContext");

  return context;
}
