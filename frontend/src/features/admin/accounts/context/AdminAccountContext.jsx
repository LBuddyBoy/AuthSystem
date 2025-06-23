import { useContext, createContext, useState } from "react";
import useQuery from "../../../../hooks/useQuery";
import Loading from "../../../../components/Loading";

const AdminAccountContext = createContext();

export const PAGE_SIZE = 10;

export function AdminAccountProvider({ children }) {
  const [cursor, setCursor] = useState(0);
  const [queryData, setQueryData] = useState();
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState({});
  const { loading, error, data } = useQuery(
    "/admin/accounts/" + PAGE_SIZE + "/" + cursor,
    [cursor]
  );

  if (loading || !data) {
    return <Loading></Loading>;
  }

  const exports = {
    accounts: data.accounts,
    nextCursor: data.nextCursor,
    cursor,
    setCursor,
    queryData,
    setQueryData,
    selected,
    setSelected,
    formData,
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
