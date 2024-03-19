import {Outlet} from "react-router-dom";
import Header from "@/layout/header.tsx";
import Footer from "@/layout/footer.tsx";

const Layout = () => {
    return (
        <div>
            <Header />
            <div className="text-white p-4 w-full">
                <Outlet/>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;