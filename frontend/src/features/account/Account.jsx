import Loading from "../../components/Loading";
import { useAccount } from "../../context/AccountContext";
import "./account.css";

export default function Account() {
  const { account } = useAccount();

  if (!account) {
    return <Loading />;
  }

  console.log(account);

  return (
    <div id="accountDetails">
      <h2>Hi, {account.username}</h2>
      <h3>Email</h3>
      <p>{account.email}</p>
    </div>
  );
}
