import { useEffect, useState } from "react";
import { useAPI } from "../context/APIContext";

export default function useQuery(resource, tag, deps = []) {
  const { request, provideTag } = useAPI();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const query = async (isMounted = true) => {
    setLoading(true);
    setError(null);
    try {
      const result = await request(resource);
      setData(result);
    } catch (e) {
      if (isMounted) {
        console.error(e);
        setError(e.message);
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (tag) provideTag(tag, query);
    query(isMounted);

    return () => {
      isMounted = false;
    };
  }, deps);

  return { loading, error, data };
}
