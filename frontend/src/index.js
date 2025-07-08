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
import CreatePostPage from "./features/forums/page/CreatePostPage";
import MyPostsPage from "./features/forums/page/MyPostsPage";

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
                  <Route index element={<App />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/verify/:token" element={<Verify />} />
                  <Route path="/404" element={<Error404 />} />
                  <Route path="/forums" element={<Forums />} />
                  <Route path="/forums/:id" element={<ForumPage />} />
                  <Route path="/posts/:id" element={<PostPage />} />
                  <Route path="*" element={<Error404 />} />

                  <Route element={<RequireAuth redirect={true}></RequireAuth>}>
                    <Route path="/account" element={<Account />} />
                    <Route path="/create-post" element={<CreatePostPage />} />
                    <Route path="/my-posts" element={<MyPostsPage />} />
                  </Route>

                  <Route
                    element={
                      <RequireAuth
                        permission="admin:panel"
                        redirect={true}
                      ></RequireAuth>
                    }
                  >
                    <Route path="/admin" element={<AdminLayout />}>
                      <Route index element={<AdminPanel />} />
                      <Route path="accounts" element={<AdminAccountLayout />} />
                      <Route path="roles" element={<AdminRolesLayout />} />
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
