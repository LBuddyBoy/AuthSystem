import { useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import "./adminAccounts.css";
import Button from "../../../components/Button";
import useQuery from "../../../hooks/useQuery";

const PAGE_SIZE = 10;

export default function AdminAccounts() {
  const [cursor, setCursor] = useState(0);
  const [query, setQuery] = useState();
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
      <SearchForm />
      <AccountsTable
        accounts={data.accounts}
        nextCursor={data.nextCursor}
        cursor={cursor}
        setCursor={setCursor}
      />
    </div>
  );
}

function SearchForm() {
  const handleSubmit = async () => {
    
  };

  return (
    <form action={handleSubmit}>
      <input
        name="search"
        placeholder="Search for an account..."
        type="text"
      ></input>
      <label>
        Filter By
        <select name="type" defaultValue={"username"} required>
          <option value="username">Username</option>
          <option value="email">Email</option>
          <option value="id">ID</option>
        </select>
      </label>
      <Button id={"searchAccountBtn"} text={"Search"} />
    </form>
  );
}

function AccountsTable({ accounts, nextCursor, cursor, setCursor }) {
  const handleNextPage = (e) => {
    e.preventDefault();
    setCursor(nextCursor);
  };

  const handlePreviousPage = () => {
    if (cursor - PAGE_SIZE < 0) {
      return;
    }

    setCursor((current) => current - PAGE_SIZE);
  };

  return (
    <>
      <table className="adminAccountTable">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {accounts.map((account) => {
            return (
              <tr key={account.id}>
                <td>
                  <img
                    src={account.avatar_url}
                    alt={"Account Avatar of " + account.username}
                  />
                </td>
                <td>{account.username}</td>
                <td>{account.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pageControls">
        <Button
          id={"previousAccountsPageBtn"}
          text={"Previous Page"}
          action={handlePreviousPage}
        />
        <Button
          id={"nextAccountsPageBtn"}
          text={"Next Page"}
          action={handleNextPage}
        />
      </div>
    </>
  );
}
