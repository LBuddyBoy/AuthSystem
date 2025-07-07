import { Outlet } from "react-router";
import AdminBar from "./AdminBar";

export default function AdminLayout() {
  return (
    <>
      <div className="admin">
        <AdminBar/>
        <Outlet />
      </div>
    </>
  );
}
