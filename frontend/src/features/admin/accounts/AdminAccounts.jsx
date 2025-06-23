import { useState } from "react";
import Loading from "../../../components/Loading";
import "./adminAccounts.css";
import useQuery from "../../../hooks/useQuery";
import AccountsTable from "./components/AccountsTable";
import AccountsSearch from "./components/AccountsSearch";
import AccountsButtons from "./components/AccountsButtons";
import {
  AdminAccountProvider,
  useAdminAccount,
} from "./context/AdminAccountContext";

export default function AdminAccounts() {
  return (
    <AdminAccountProvider>
      <div className="adminAccounts">
        <header>
          <h1>Accounts</h1>
        </header>
        <AccountsSearch />
        <AccountsTable/>
        <AccountsButtons/>
      </div>
    </AdminAccountProvider>
  );
}
