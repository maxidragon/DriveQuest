import {Navbar} from "@/layout/navbar.tsx";
import {Outlet} from "react-router-dom";

const Layout = () => {
    return (
        <div>
            <Navbar />
            <div className="text-white p-4 w-full">
                <Outlet/>
            </div>
        </div>
    );
};

export default Layout;