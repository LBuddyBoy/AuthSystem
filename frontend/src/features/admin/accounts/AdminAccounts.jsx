import AccountsTable from "./components/AccountsTable";
import AccountsSearch from "./components/AccountsSearch";
import AccountsButtons from "./components/AccountsButtons";
import { useAdminAccount } from "../../../context/AdminAccountContext";

export default function AdminAccounts() {
  const { error } = useAdminAccount();

  return (
    <div className="adminAccounts">
      <header>
        <h1>Accounts</h1>
      </header>
      <AccountsSearch />
      {error && <p className="errorText">{error}</p>}
      <AccountsTable />
      <AccountsButtons />
    </div>
  );
}