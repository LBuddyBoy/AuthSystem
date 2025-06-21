import { Outlet } from "react-router";
import Navbar from "./Navbar";

export default function Layout() {
    return (
        <main>
            <Navbar/>
            <Outlet/>
        </main>
    );
}