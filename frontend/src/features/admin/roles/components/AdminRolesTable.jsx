import { useAdminRoles } from "../context/AdminRolesContext";

export default function AdminRolesTable() {
  return <table>
    <TableHead/>
    <TableBody/>
  </table>;
}

function TableHead() {
    return <thead>
        <tr>
            <th>Name</th>
            <th>Icon</th>
            <th>Weight</th>
            <th>Default</th>
            <th>Staff</th>
            <th>Permissions</th>
        </tr>
    </thead>
}

function TableBody() {
  const { roles } = useAdminRoles();

  return <tbody>
        {roles.map((role) => {
            return <tr key={role.id}>
                <td>{role.name}</td>
                <td>{role.icon}</td>
                <td>{role.weight}</td>
                <td>{role.is_default}</td>
                <td>{role.is_staff}</td>
                <td>{role.permissions}</td>
            </tr>
        })}
  </tbody>
}
