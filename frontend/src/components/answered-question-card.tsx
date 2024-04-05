import { t } from "i18next";

import QuestionAsset from "@/components/question-asset.tsx";
import { Question, UserAnswer } from "@/lib/interfaces.ts";

interface AnsweredQuestionCardProps {
    userAnswer: UserAnswer;
    questions: Question[];
}

const AnsweredQuestionCard = ({
    userAnswer,
    questions,
}: AnsweredQuestionCardProps) => {
    return (
        <div className="flex flex-col gap-5 items-center border-2 border-gray-500 p-2">
            <h1>
                {questions.indexOf(
                    questions.find(
                        (q) => q.id === userAnswer.answer?.question?.id
                    )!
                ) + 1}
                . {userAnswer.answer?.question?.text}
            </h1>
            <div className="w-1/2 h-1/2 items-center justify-center">
                <QuestionAsset
                    question={
                        questions.find(
                            (q) => q.id === userAnswer.answer?.question?.id
                        )!
                    }
                />
            </div>
            <div className="flex gap-2 items-center justify-center flex-col">
                <p>
                    {t("yourAnswer")}: {userAnswer.answer?.text}
                </p>
                <p>
                    {t("correctAnswer")}:{" "}
                    {
                        questions
                            .find(
                                (q) => q.id === userAnswer.answer?.question?.id
                            )
                            ?.answers.find((a) => a.isCorrect)?.text
                    }
                </p>
            </div>
        </div>
    );
};

export default AnsweredQuestionCard;
