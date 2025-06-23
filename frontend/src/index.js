import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App";
import Layout from "./layout/Layout";
import { AccountProvider } from "./context/AccountContext";
import { APIProvider } from "./context/APIContext";
import Login from "./features/login/Login";
import Account from "./features/account/Account";
import SignUp from "./features/signup/SignUp";
import Verify from "./features/verify/Verify";
import { ThemeProvider } from "./context/ThemeContext";
import Admin from "./features/admin/Admin";
import RequireAuth from "./components/RequireAuth";
import Error404 from "./components/Error404";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AccountProvider>
          <APIProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route index path="/" element={<App />} />
                <Route index path="/login" element={<Login />} />
                <Route index path="/signup" element={<SignUp />} />
                <Route index path="/account" element={<Account />} />
                <Route index path="/verify" element={<Verify />} />
                <Route index path="/404" element={<Error404 />} />
                <Route element={<RequireAuth permission="admin:panel" redirect={true} />}>
                  <Route path="/admin" element={<Admin />} />
                </Route>
              </Route>
            </Routes>
          </APIProvider>
        </AccountProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
