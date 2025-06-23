import { useContext, createContext, useState } from "react";
import useQuery from "../../../../hooks/useQuery.js";
import Loading from "../../../../components/Loading";

const AdminRolesContext = createContext();

export function AdminRolesProvider({ children }) {
  const { loading, data: roles } = useQuery("/roles");
  const [error, setError] = useState();

  if (loading || !roles) return <Loading></Loading>;

  const exports = {
    roles,
    error,
    setError,
  };

  return (
    <AdminRolesContext.Provider value={exports}>
      {children}
    </AdminRolesContext.Provider>
  );
}

export function useAdminRoles() {
  const context = useContext(AdminRolesContext);

  if (!context) {
    throw new Error("useAdminRoles must be used within the AdminRolesProvider");
  }

  return context;
}
