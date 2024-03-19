import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import {login} from "@/lib/auth.ts";
import {toast} from "sonner"
import {Link, useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = form.email.value;
        const password = form.password.value;
        const response = await login(email, password);
        if (response.status === 200) {
            if (response.data.token) {
                toast.success("You have been successfully logged in");
                navigate("/");
            } else {
                toast.info("We have sent you an email with a link to verify your account.")
            }
        } else if (response.status === 403) {
            toast.error("Wrong credentials!");
        } else {
            toast.error("Something went wrong!");
        }
    };
    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="mx-auto max-w-sm">
                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-2xl font-bold">Login</CardTitle>
                        <Link to="/auth/register" className="text-blue-500">Don't have an account?</Link>
                    <CardDescription>
                        Enter your email and password to login to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" placeholder="john.doe@example.com" required type="email"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" required type="password"/>
                            </div>
                            <Button className="w-full" type="submit">
                                Login
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;