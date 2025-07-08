import { Navigate, Outlet } from "react-router";
import { useAccount } from "../context/AccountContext";

export default function RequireAuth({ permission = "", children, redirect = false }) {
  const { account, hasPermission } = useAccount();

  if (!account) {
    return <Navigate to={"/login"} replace></Navigate>;
  }

  console.log("account:", account);
console.log("permission required:", permission);
console.log("hasPermission?", permission ? hasPermission(permission) : true);

  if (permission !== "" && !hasPermission(permission)) {
    if (redirect) {
        return <Navigate to={"/404"} replace/>
    }
    return <></>;
  }

  return children ? children : <Outlet />;
}
