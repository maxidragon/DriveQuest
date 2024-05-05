import { t } from "i18next";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button.tsx";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { login } from "@/lib/auth.ts";

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
                toast.success(t("loginSuccess"));
                navigate("/");
            }
        } else if (response.status === 403) {
            toast.error(t("wrongCredentials"));
        } else {
            toast.error(t("somethingWentWrong"));
        }
    };
    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="mx-auto max-w-sm">
                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-2xl font-bold">
                        {t("login")}
                    </CardTitle>
                    <Link to="/auth/register" className="text-blue-500">
                        {t("dontHaveAccount")}
                    </Link>
                    <CardDescription>{t("loginDescription")}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">{t("email")}</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    placeholder="john.doe@example.com"
                                    required
                                    type="email"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">
                                    {t("password")}
                                </Label>
                                <Input
                                    id="password"
                                    name="password"
                                    required
                                    type="password"
                                />
                            </div>
                            <Button className="w-full" type="submit">
                                {t("login")}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
