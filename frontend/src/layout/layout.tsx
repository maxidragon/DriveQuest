import { Outlet } from "react-router-dom";

import { Navbar } from "@/layout/navbar.tsx";

const Layout = () => {
    return (
        <div>
            <Navbar />
            <div className="text-white p-4 w-full">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
