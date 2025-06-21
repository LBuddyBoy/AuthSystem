import { Link, useNavigate } from "react-router";
import { useAccount } from "../../context/AccountContext";
import "./login.css";
import Button from "../../components/Button";

export default function Login() {
  const { login } = useAccount();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    await login({ email, password });
    navigate("/account");
  };

  return (
    <form id="loginForm" action={handleSubmit}>
      <h1>Log into your Account</h1>
      <input name="email" placeholder="Email" type="email" required />
      <input name="password" placeholder="Password" type="password" required />
      <Button id="loginBtn" text={"Login"}/>
      <Link to={"/signup"}>Don't have an account? Sign up here!</Link>
    </form>
  );
}
