import {Button} from "@/components/ui/button.tsx";
import LoginPartial from "@/layout/login-partial.tsx";
import {isUserLoggedIn} from "@/lib/auth.ts";
import {t} from "i18next";
import {Link, useNavigate} from "react-router-dom";

const Header = () => {
    const isLoggedIn = isUserLoggedIn();
    const navigate = useNavigate();

    return (
        <div className="bg-gray-800 p-4 flex justify-between">
            <div className="flex gap-2 items-center">
                <Link to="/">
                    <h1 className="text-white font-bold">DriveQuest</h1>
                </Link>
                {isLoggedIn && (
                    <>
                        <Button variant="outline" onClick={() => navigate("/questions")}>
                            {t('allQuestions')}
                        </Button>
                        <Button variant="outline" onClick={() => navigate("/exam")}>
                            {t('takeATest')}
                        </Button>
                    </>
                )}
            </div>
            <LoginPartial/>
        </div>
    );
};

export default Header;