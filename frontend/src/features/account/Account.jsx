import { useNavigate } from "react-router";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import { useAccount } from "../../context/AccountContext";
import "./account.css";

export default function Account() {
  const { account, logout } = useAccount();
  const navigate = useNavigate();

  if (!account) {
    return <Loading />;
  }

  const handleClick = () => {
    logout();
    navigate("/");
  }

  return (
    <div id="accountDetails">
      <h2>Hi, {account.username}</h2>
      <h3>Email</h3>
      <p>{account.email}</p>
      <p>{account.role.name}</p>
      <Button id={"logout"} text={"Logout"} action={handleClick}/>
    </div>
  );
}
