import {Button} from "@/components/ui/button";
import {NavigationMenu, NavigationMenuItem, NavigationMenuList,} from "@/components/ui/navigation-menu";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,} from "@/components/ui/sheet";
import LoginPartial from "@/layout/login-partial.tsx";
import {isUserLoggedIn} from "@/lib/auth.ts";
import {HamburgerMenuIcon} from "@radix-ui/react-icons";
import {t} from "i18next";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

interface RouteProps {
    href: string;
    label: string;
}

const routeList: RouteProps[] = [
    {
        href: "/questions",
        label: 'allQuestions'
    },
    {
        href: "/exam",
        label: 'takeATest'
    },
];

export const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = isUserLoggedIn();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
            <NavigationMenu className="mx-auto">
                <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between">
                    <NavigationMenuItem className="font-bold flex">
                        <Link to="/">
                            <h1 className="text-white font-bold">DriveQuest</h1>
                        </Link>
                    </NavigationMenuItem>
                    <span className="flex md:hidden">
            <Sheet
                open={isOpen}
                onOpenChange={setIsOpen}
            >
              <SheetTrigger className="px-2">
                <div
                    className="flex md:hidden h-5 w-5"
                    onClick={() => setIsOpen(true)}
                >
                    <HamburgerMenuIcon className="h-5 w-5"/>
                  <span className="sr-only">Menu Icon</span>
                </div>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="font-bold text-xl">
                    DriveQuest
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col justify-center items-center gap-2 mt-4">
                  {isLoggedIn && routeList.map((route: RouteProps) => (
                      <Button
                          onClick={() => {
                              navigate(route.href);
                              setIsOpen(false);
                          }}
                          key={route.href}
                          variant="outline"
                      >
                          {t(route.label)}
                      </Button>
                  ))}
                    <LoginPartial/>
                </nav>
              </SheetContent>
            </Sheet>
          </span>
                    <nav className="hidden md:flex gap-2">
                        {isLoggedIn && routeList.map((route: RouteProps, i) => (
                            <Button
                                onClick={() => navigate(route.href)}
                                key={i}
                                variant="outline"
                            >
                                {t(route.label)}
                            </Button>
                        ))}
                        <LoginPartial/>
                    </nav>
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    );
};
