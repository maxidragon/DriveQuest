import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "@/pages/home/home.tsx";
import {ThemeProvider} from "@/providers/theme-provider.tsx";
import Login from "@/pages/auth/login/login.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";
import Register from "@/pages/auth/register/register.tsx";
import Verify from "@/pages/auth/verify/verify.tsx";

function App() {
    const router = createBrowserRouter([
        {
            path: 'auth/login',
            element: <Login/>,
        },
        {
            path: 'auth/register',
            element: <Register/>,
        },
        {
            path: 'auth/verify/:id',
            element: <Verify/>,
        },
        {
            path: '/',
            element: <Home/>,
        },
    ]);
    return (
        <ThemeProvider defaultTheme="dark" storageKey="drive-quest-theme">
            <RouterProvider router={router} />
            <Toaster />
        </ThemeProvider>
    )
}

export default App
