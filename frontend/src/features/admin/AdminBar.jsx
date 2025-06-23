import { NavLink } from "react-router";

export default function AdminBar() {
    return <div className="adminBar">
        <h3>Admin Navigator</h3>
        <nav className="adminLinks">
            <NavLink to={"/admin/users"}>Users</NavLink>
        </nav>
    </div>
}