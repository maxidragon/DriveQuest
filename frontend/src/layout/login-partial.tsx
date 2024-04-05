import { t } from "i18next";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button.tsx";
import { isUserLoggedIn, logout } from "@/lib/auth.ts";

const LoginPartial = () => {
    const isLoggedIn = isUserLoggedIn();
    const navigate = useNavigate();

    return (
        <div>
            {isLoggedIn ? (
                <div className="flex items-center gap-2">
                    <Button
                        variant="default"
                        onClick={() => {
                            logout();
                            navigate("/");
                        }}
                    >
                        {t("logout")}
                    </Button>
                </div>
            ) : (
                <div className="flex gap-2">
                    <Button
                        variant="default"
                        onClick={() => navigate("/auth/login")}
                    >
                        {t("login")}
                    </Button>
                    <Button
                        variant="default"
                        onClick={() => navigate("/auth/register")}
                    >
                        {t("register")}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default LoginPartial;
