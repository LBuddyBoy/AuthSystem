import { useState } from "react";
import { useAPI } from "../context/APIContext";

export default function useMutation(resource, method, tagsToInvalidate) {
  const { request, invalidateTags } = useAPI();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (body, parameters = "") => {
    setLoading(true);
    setError(null);
    try {
      const result = await request(resource + parameters, {
        method,
        body: JSON.stringify(body),
      });
      console.log(result);
      setData(result);
      invalidateTags(tagsToInvalidate);
      return result;
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { mutate, data, loading, error };
}
