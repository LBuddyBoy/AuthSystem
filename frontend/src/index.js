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

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <AccountProvider>
        <APIProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route index path="/" element={<App />} />
              <Route index path="/login" element={<Login />} />
              <Route index path="/account" element={<Account />} />
            </Route>
          </Routes>
        </APIProvider>
      </AccountProvider>
    </BrowserRouter>
  </StrictMode>
);
