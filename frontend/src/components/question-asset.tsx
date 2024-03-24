import {getAssetType} from "@/lib/utils.ts";
import {Question} from "@/lib/interfaces.ts";
import {FILES_URL} from "@/lib/constants.ts";
import ReactPlayer from "react-player";

const QuestionAsset = ({question}: { question: Question }) => {
    console.log(question);
    if (!question.assetName) return null;
    const assetType = getAssetType(question.assetName);
    if (!assetType || assetType === "other") {
        return null;
    }
    if (assetType === "image") {
        return <img src={`${FILES_URL}/${question.assetName}`} alt="Question asset" className="w-full h-auto"/>;
    } else if (assetType === "video") {
        return (
            <div>
                s
            </div>
        )
    }
};

export default QuestionAsset;
