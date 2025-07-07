import { createContext, useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import { API } from "./APIContext";

const AccountContext = createContext();

export function AccountProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    const verify = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${API}/account/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ jwt: token }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw result;
        }

        setAccount(result);
      } catch (error) {
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setAccount(null);
  };

  const login = async ({ email, password }) => {
    const response = await fetch(`${API}/account/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw result;
    }

    localStorage.setItem("token", result.token);
    setToken(result.token);
  };

  const signup = async ({ username, email, password }) => {
    const response = await fetch(`${API}/account/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw result;
    }

  };

  const update = async ({ id, payload }) => {
    const response = await fetch(`${API}/admin/account`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ id, ...payload }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result);
    }

    return result;
  };

  const hasPermission = (permission) => {
    if (!account) {
      throw new Error("No account found to check permissions.");
    }

    return (
      account.role.permissions.includes(permission) ||
      account.role.permissions.includes("*")
    );
  };

  const query = async (resource) => {
    const response = await fetch(API + resource, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const result = await response.json();
    if (!response.ok) {
      throw result;
    }

    return result;
  };

  const exports = {
    token,
    account,
    setAccount,
    login,
    signup,
    logout,
    update,
    hasPermission,
    query,
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <AccountContext.Provider value={exports}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const context = useContext(AccountContext);

  if (!context)
    throw new Error("useAccount must be used within the AccountContext");

  return context;
}
