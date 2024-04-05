import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Toaster } from "@/components/ui/sonner.tsx";
import Layout from "@/layout/layout.tsx";
import Login from "@/pages/auth/login/login.tsx";
import Register from "@/pages/auth/register/register.tsx";
import Verify from "@/pages/auth/verify/verify.tsx";
import Exam from "@/pages/exam/exam.tsx";
import Home from "@/pages/home/home.tsx";
import Question from "@/pages/question/question.tsx";
import Questions from "@/pages/questions/questions.tsx";
import RandomQuestion from "@/pages/random-question/random-question.tsx";
import { ThemeProvider } from "@/providers/theme-provider.tsx";

function App() {
    const router = createBrowserRouter([
        {
            path: "auth/login",
            element: <Login />,
        },
        {
            path: "auth/register",
            element: <Register />,
        },
        {
            path: "auth/verify/:id",
            element: <Verify />,
        },
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "",
                    element: <Home />,
                },
                {
                    path: "questions",
                    element: <Questions />,
                },
                {
                    path: "questions/random",
                    element: <RandomQuestion />,
                },
                {
                    path: "questions/:id",
                    element: <Question />,
                },
                {
                    path: "exam",
                    element: <Exam />,
                },
            ],
        },
    ]);
    return (
        <ThemeProvider defaultTheme="dark" storageKey="drive-quest-theme">
            <RouterProvider router={router} />
            <Toaster />
        </ThemeProvider>
    );
}

export default App;
