import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "@/pages/home/home.tsx";
import {ThemeProvider} from "@/providers/theme-provider.tsx";
import Login from "@/pages/auth/login/login.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";
import Register from "@/pages/auth/register/register.tsx";
import Verify from "@/pages/auth/verify/verify.tsx";
import Layout from "@/layout/layout.tsx";
import Questions from "@/pages/questions/questions.tsx";
import RandomQuestion from "@/pages/random-question/random-question.tsx";

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
            element: <Layout/>,
            children: [
                {
                    path: '',
                    element: <Home/>,
                },
                {
                    path: 'questions',
                    element: <Questions />,
                },
                {
                    path: 'questions/random/:category',
                    element: <RandomQuestion/>,
                }
            ],
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
