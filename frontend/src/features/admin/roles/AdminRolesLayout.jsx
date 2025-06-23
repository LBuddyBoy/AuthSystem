import AdminRoles from "./AdminRoles";
import { AdminRolesProvider } from "./context/AdminRolesContext";

export default function AdminRolesLayout() {
    return <AdminRolesProvider>
        <AdminRoles/>
    </AdminRolesProvider>
}