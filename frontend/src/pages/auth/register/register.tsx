import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import {registerUser} from "@/lib/auth.ts";
import {toast} from "sonner"
import {Link, useNavigate} from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = form.email.value;
        const password = form.password.value;
        const repeatedPassword = form.password2.value;
        if (password !== repeatedPassword) {
            toast.error("Passwords do not match!");
            return;
        }
        const status = await registerUser(email, password);
        if (status === 200) {
            toast.success("Registered successfully. Please check your email to verify your account.");
            navigate("/auth/login");
        } else {
            toast.error("Something went wrong!");
        }
    };
    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="mx-auto max-w-sm">
                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                    <Link to="/auth/login" className="text-blue-500">Already have an account?</Link>
                    <CardDescription>
                        Enter your email and password to create an account. We will send you verification email.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" placeholder="john.doe@example.com" required
                                       type="email"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" required type="password"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Repeat password</Label>
                                <Input id="password2" name="password2" required type="password"/>
                            </div>
                            <Button className="w-full" type="submit">
                                Create account
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Register;