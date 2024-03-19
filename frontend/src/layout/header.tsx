import {Button} from "@/components/ui/button.tsx";
import LoginPartial from "@/layout/login-partial.tsx";
import {isUserLoggedIn} from "@/lib/auth.ts";
import {t} from "i18next";

const Header = () => {
    const isLoggedIn = isUserLoggedIn();

    return (
        <div className="bg-gray-800 p-4 flex justify-between">
            <div className="flex gap-2 items-center">
                <h1 className="text-white font-bold">DriveQuest</h1>
                {isLoggedIn && (
                    <>
                        <Button variant="outline">{t('allQuestions')}</Button>
                        <Button variant="outline">{t('takeATest')}</Button>
                    </>
                )}
            </div>
            <LoginPartial/>
        </div>
    );
};

export default Header;