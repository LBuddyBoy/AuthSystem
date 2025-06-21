import { useEffect, useState } from "react";
import { useAPI } from "./APIContext";

export default function useQuery(resource, tag) {
  const { request, provideTag } = useAPI();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const query = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await request(resource);
      setData(result);
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tag) provideTag(tag, query);
    query();
  });

  return { data, loading, error };
}
