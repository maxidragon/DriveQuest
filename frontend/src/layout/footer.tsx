import {GitHubLogoIcon} from "@radix-ui/react-icons";
import {Button} from "@/components/ui/button.tsx";

const Footer = () => {
    return (
        <div className="bg-gray-800 p-4 flex items-center w-full fixed bottom-0">
            <a href="https://github.com/maxidragon/DriveQuest" target="_blank">
                <Button variant="ghost">
                    <GitHubLogoIcon className="w-8 h-8 text-white hover:text-gray-400"/>
                </Button>
            </a>
            <h1 className="text-white">
                If you like this project you can support me by giving a star on GitHub
            </h1>
        </div>
    )
};

export default Footer;