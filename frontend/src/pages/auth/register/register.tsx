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
import { registerUser } from "@/lib/auth.ts";

const Register = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = form.email.value;
        const password = form.password.value;
        const repeatedPassword = form.password2.value;
        if (password !== repeatedPassword) {
            toast.error(t("passwordsDoNotMatch"));
            return;
        }
        const status = await registerUser(email, password);
        if (status === 200) {
            toast.success(t("registeredSuccessfully"));
            navigate("/auth/login");
        } else {
            toast.error("Something went wrong!");
        }
    };
    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="mx-auto max-w-sm">
                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-2xl font-bold">
                        {t("createAnAccount")}
                    </CardTitle>
                    <Link to="/auth/login" className="text-blue-500">
                        {t("alreadyHaveAnAccount")}
                    </Link>
                    <CardDescription>
                        {t("registerDescription")}
                    </CardDescription>
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
                            <div className="space-y-2">
                                <Label htmlFor="password">
                                    {t("repeatPassword")}
                                </Label>
                                <Input
                                    id="password2"
                                    name="password2"
                                    required
                                    type="password"
                                />
                            </div>
                            <Button className="w-full" type="submit">
                                {t("register")}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Register;
