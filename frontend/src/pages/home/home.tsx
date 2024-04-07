import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button.tsx";
import { isUserLoggedIn } from "@/lib/auth.ts";

const Home = () => {
    const navigate = useNavigate();
    const isLoggedIn = isUserLoggedIn();

    return (
        <div className="flex flex-col gap-2">
            <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
                <div className="text-center lg:text-start space-y-6">
                    <main className="text-5xl md:text-6xl font-bold">
                        <h1 className="inline">
                            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
                                {t("home1")}
                            </span>{" "}
                            {t("home2")}
                        </h1>{" "}
                        {t("home3")}{" "}
                        <h2 className="inline">
                            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
                                {t("home4")}
                            </span>{" "}
                            {t("home5")}
                        </h2>
                    </main>

                    <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
                        {t("about")}
                    </p>

                    <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row">
                        <Button
                            className="w-full md:w-1/3"
                            onClick={() =>
                                navigate(isLoggedIn ? "/exam" : "/auth/login")
                            }
                        >
                            {t("getStarted")}
                        </Button>
                        <a
                            href="https://github.com/maxidragon/DriveQuest"
                            target="_blank"
                        >
                            <Button variant="secondary" className="w-full">
                                GitHub
                                <GitHubLogoIcon className="ml-2 w-5 h-5" />
                            </Button>
                        </a>
                    </div>
                </div>
                <div className="shadow"></div>
            </section>
        </div>
    );
};

export default Home;
