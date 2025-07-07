import { NavLink } from "react-router";
import "./adminBar.css";

export default function AdminBar() {
  return (
    <div className="adminBar">
      <nav className="adminLinks">
        <NavLink to={"/admin/accounts"}>Accounts</NavLink>
        <NavLink to={"/admin/roles"}>Roles</NavLink>
        <NavLink to={"/admin/posts"}>Posts</NavLink>
      </nav>
    </div>
  );
}
