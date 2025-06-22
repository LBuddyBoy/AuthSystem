import { useNavigate } from "react-router";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import { useAccount } from "../../context/AccountContext";
import "./account.css";
import AccountForm from "./AccountForm";
import AccountInfo from "./AccountInfo";

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
      <AccountForm/>
      <AccountInfo/>
      <Button id={"logoutBtn"} text={"Logout"} action={handleClick}/>
    </div>
  );
}
