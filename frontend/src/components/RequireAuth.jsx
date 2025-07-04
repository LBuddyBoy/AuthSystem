import { Navigate, Outlet } from "react-router";
import { useAccount } from "../context/AccountContext";

export default function RequireAuth({ permission, children, redirect = false }) {
  const { account, hasPermission } = useAccount();

  if (!account) {
    return <></>;
  }

  if (!hasPermission(permission)) {
    if (redirect) {
        return <Navigate to={"/404"} replace/>
    }
    return <></>;
  }

  return children ? children : <Outlet />;
}
