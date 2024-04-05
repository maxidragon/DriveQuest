import {getAssetType} from "@/lib/utils.ts";
import {Question} from "@/lib/interfaces.ts";
import {FILES_URL} from "@/lib/constants.ts";
import ReactPlayer from "react-player";

const QuestionAsset = ({question}: { question: Question }) => {
    if (!question.assetName) return null;
    const assetType = getAssetType(question.assetName);
    if (!assetType || assetType === "other") {
        return null;
    }
    if (assetType === "image") {
        return <div><img src={`${FILES_URL}/${question.assetName}`} alt="Question asset"/></div>;
    } else if (assetType === "video") {
        return (
            <ReactPlayer
                url={`${FILES_URL}/${question.assetName}`}
                controls
                width="100%"
            />
        );
    }
};

export default QuestionAsset;
