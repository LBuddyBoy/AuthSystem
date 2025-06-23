import { useEffect, useState } from "react";
import { useAccount } from "../context/AccountContext";
import { API } from "../context/AccountContext";

export default function useQuery(resource, deps = []) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const { token } = useAccount();

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetch(API + resource, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, deps);

  return { loading, error, data };
}
