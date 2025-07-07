import AdminAccounts from "./AdminAccounts";
import "./adminAccounts.css";
import { AdminAccountProvider } from "../../../context/AdminAccountContext";

export default function AdminAccountLayout() {
  return (
    <AdminAccountProvider>
        <AdminAccounts/>
    </AdminAccountProvider>
  );
}

