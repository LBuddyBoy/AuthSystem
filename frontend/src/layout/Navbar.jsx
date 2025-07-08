import { NavLink } from "react-router";
import "./nav.css";
import { useAccount } from "../context/AccountContext";
import { useTheme } from "../context/ThemeContext";
import Button from "../components/Button";
import RequireAuth from "../components/RequireAuth";

export default function Navbar() {
  const { account } = useAccount();

  return (
    <header className="navBar">
      <NavLink to={"/"} className={"navTitle"}>
        <h3>Auth System</h3>
      </NavLink>
      <nav className="navLinks">
        {!account ? (
          <>
            <NavLink to={"/login"}>Login</NavLink>
            <NavLink to={"/signup"}>Signup</NavLink>
            <NavLink to={"/forums"}>Forums</NavLink>
          </>
        ) : (
          <>
            <NavLink to={"/forums"}>Forums</NavLink>
            <RequireAuth permission={"admin:panel"}>
                <NavLink to={"/admin"}>Admin</NavLink>
            </RequireAuth>
          </>
        )}
      </nav>
      {!account ? (
        <div className="buttons">
          <ThemeButton />
        </div>
      ) : (
        <div className="buttons">
          <NavLink to={"/account"}>
            <img src={account.avatar_url} alt="Account Avatar" />
          </NavLink>
          <ThemeButton />
        </div>
      )}
    </header>
  );
}

function ThemeButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Button
      action={toggleTheme}
      id={"themeBtn"}
      text={theme === "light" ? "🌙" : "☀️"}
    />
  );
}
