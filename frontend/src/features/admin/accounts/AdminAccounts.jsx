import { useState } from "react";
import Loading from "../../../components/Loading";
import "./adminAccounts.css";
import useQuery from "../../../hooks/useQuery";
import AccountsTable from "./components/AccountsTable";
import SearchForm from "./components/AccountsSearch";
import AccountsButtons from "./components/AccountsButtons";

export const PAGE_SIZE = 10;

export default function AdminAccounts() {
  const [cursor, setCursor] = useState(0);
  const [queryData, setQueryData] = useState();
  const { loading, error, data } = useQuery(
    "/admin/accounts/" + PAGE_SIZE + "/" + cursor,
    [cursor]
  );

  if (loading || !data) {
    return <Loading></Loading>;
  }

  return (
    <div className="adminAccounts">
      <header>
        <h1>Accounts</h1>
      </header>
      <SearchForm setQueryData={setQueryData}/>
      <AccountsTable accounts={queryData ? queryData : data.accounts} />
      <AccountsButtons
        nextCursor={data.nextCursor}
        cursor={cursor}
        setCursor={setCursor}
      />
    </div>
  );
}