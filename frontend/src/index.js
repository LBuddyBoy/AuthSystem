import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App";
import Layout from "./layout/Layout";
import { AccountProvider } from "./context/AccountContext";
import Login from "./features/login/Login";
import Account from "./features/account/Account";
import SignUp from "./features/signup/SignUp";
import Verify from "./features/verify/Verify";
import { ThemeProvider } from "./context/ThemeContext";
import AdminPanel from "./features/admin/AdminPanel";
import RequireAuth from "./components/RequireAuth";
import Error404 from "./components/Error404";
import AdminLayout from "./features/admin/layout/AdminLayout";
import AdminRolesLayout from "./features/admin/roles/AdminRolesLayout";
import AdminAccountLayout from "./features/admin/accounts/AdminAccountLayout";
import ForumPage from "./features/forums/page/ForumPage";
import PostPage from "./features/forums/page/PostPage";
import Forums from "./features/forums/Forums";
import { ForumsProvider } from "./context/ForumsContext";
import Tiptap from "./components/Tiptap";
import { APIProvider } from "./context/APIContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AccountProvider>
          <APIProvider>
            <ForumsProvider>
              <Routes>
                <Route element={<Layout />}>
                  <Route index path="/" element={<App />} />
                  <Route index path="/login" element={<Login />} />
                  <Route index path="/signup" element={<SignUp />} />
                  <Route index path="/account" element={<Account />} />
                  <Route index path="/verify" element={<Verify />} />
                  <Route index path="/404" element={<Error404 />} />
                  <Route index path="/tiptap" element={<Tiptap />} />
                  <Route index path="/forums" element={<Forums />} />
                  <Route index path="/forums/:id" element={<ForumPage />} />
                  <Route index path="/posts/:id" element={<PostPage />} />
                  <Route
                    element={
                      <RequireAuth permission="admin:panel" redirect={true} />
                    }
                  >
                    <Route element={<AdminLayout />}>
                      <Route path="/admin" element={<AdminPanel />} />
                      <Route
                        path="/admin/accounts"
                        element={<AdminAccountLayout />}
                      />
                      <Route
                        path="/admin/roles"
                        element={<AdminRolesLayout />}
                      />
                    </Route>
                  </Route>
                </Route>
              </Routes>
            </ForumsProvider>
          </APIProvider>
        </AccountProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
