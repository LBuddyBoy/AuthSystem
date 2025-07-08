import { Link, useNavigate } from "react-router";
import Button from "../../components/Button";
import "./signup.css";
import { useAccount } from "../../context/AccountContext";
import { useState } from "react";
import Error from "../../components/Error";

export default function SignUp() {
  const [error, setError] = useState(null);
  const { signup } = useAccount();
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    
    try {
      signup({ username, email, password });
      navigate("/verify");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <form id="signupForm" action={handleSubmit}>
      <h1>Create an Account</h1>
      <input name="email" placeholder="Email" type="email" required />
      <input name="username" placeholder="Username" type="text" required />
      <input name="password" placeholder="Password" type="password" required />
      {error && <Error error={error}/>}
      <Button id={"signupBtn"} text={"Sign Up"} />
      <Link to={"/login"}>Already have an account? Log in here!</Link>
    </form>
  );
}
