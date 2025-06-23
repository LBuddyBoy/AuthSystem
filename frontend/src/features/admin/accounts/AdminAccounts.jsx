import AdminAccountLayout from "./AdminAccountLayout";
import "./adminAccounts.css";
import { AdminAccountProvider } from "./context/AdminAccountContext";

export default function AdminAccounts() {
  return (
    <AdminAccountProvider>
        <AdminAccountLayout/>
    </AdminAccountProvider>
  );
}
