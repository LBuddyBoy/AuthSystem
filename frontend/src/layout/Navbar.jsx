import { NavLink } from "react-router";
import "./nav.css";
import { useAccount } from "../context/AccountContext";

export default function Navbar() {
  const { token } = useAccount();

  return (
    <header className="navBar">
      <NavLink to={"/"} className={"navTitle"}>
        <h3>Auth System</h3>
      </NavLink>
      <nav className="navLinks">
        {!token ? (
          <>
            <NavLink to={"/login"}>Login</NavLink>
            <NavLink to={"/signup"}>Signup</NavLink>
          </>
        ) : (
          <>
            <NavLink to={"/account"}>Account</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
