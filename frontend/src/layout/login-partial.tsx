import {getUserInfo, isUserLoggedIn, logout} from "@/lib/auth.ts";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import {t} from "i18next";

const LoginPartial = () => {
    const isLoggedIn = isUserLoggedIn();
    const userInfo = getUserInfo();
    const navigate = useNavigate();

    return (
        <div>
            {isLoggedIn ? (
                <div className="flex items-center gap-2">
                    <p className="hidden md:block">{t('hello')} {userInfo?.email}</p>
                    <Button variant="default" onClick={() => {
                        logout();
                        navigate("/");
                    }}>
                        {t('logout')}
                    </Button>
                </div>
            ) : (
                <div className="flex gap-2">
                    <Button variant="default" onClick={() => navigate("/auth/login")}>
                        {t('login')}
                    </Button>
                    <Button variant="default" onClick={() => navigate('/auth/register')}>
                        {t('register')}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default LoginPartial;
