import { useContext, createContext, useState } from "react";
import useQuery from "../hooks/useQuery";
import Loading from "../components/Loading";
import { useAPI } from "./APIContext";

const AdminAccountContext = createContext();

export const PAGE_SIZE = 10;

export function AdminAccountProvider({ children }) {
  const [cursor, setCursor] = useState(0);
  const [updated, setUpdated] = useState(0);
  const [queryData, setQueryData] = useState();
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState();
  const { loading, data } = useQuery(
    "/admin/accounts/" + PAGE_SIZE + "/" + cursor,
    "accounts", [cursor],
  );
  const { loading: rolesLoading, data: roles } = useQuery("/roles");

  if (loading || !data || rolesLoading || !roles) {
    return <Loading></Loading>;
  }

  const { accounts, nextCursor } = data;

  const handleNextPage = (e) => {
    e.preventDefault();
    setCursor(nextCursor);
  };

  const handlePreviousPage = () => {
    if (cursor - PAGE_SIZE < 0 || cursor <= 0) {
      return;
    }

    setCursor((current) => current - PAGE_SIZE);
  };

  const exports = {
    handleNextPage,
    handlePreviousPage,
    accounts: queryData ? queryData : accounts,
    nextCursor,
    cursor,
    roles,
    setCursor,
    queryData,
    setQueryData,
    selected,
    setSelected,
    formData,
    error,
    setError,
    setUpdated,
    setFormData,
  };

  return (
    <AdminAccountContext.Provider value={exports}>
      {children}
    </AdminAccountContext.Provider>
  );
}

export function useAdminAccount() {
  const context = useContext(AdminAccountContext);

  if (!context) {
    throw new Error(
      "useAdminAccount must be used within the AdminAccountProvider"
    );
  }

  return context;
}
