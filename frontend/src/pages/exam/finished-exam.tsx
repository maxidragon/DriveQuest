import { t } from "i18next";

import AnsweredQuestionCard from "@/components/answered-question-card.tsx";
import { Question, UserAnswer } from "@/lib/interfaces.ts";

interface FinishedExamProps {
    userAnswers: UserAnswer[];
    questions: Question[];
    result: string;
}
const FinishedExam = ({
    userAnswers,
    questions,
    result,
}: FinishedExamProps) => {
    return (
        <div className="text-center text-2xl">
            <div>{t("examFinished")}</div>
            <div>
                {t("result")}: {result}
            </div>
            <div className="flex flex-col gap-5">
                {userAnswers
                    .filter((userAnswer) => !userAnswer.answer?.isCorrect)
                    .map((userAnswer, index) => (
                        <AnsweredQuestionCard
                            key={index}
                            userAnswer={userAnswer}
                            questions={questions}
                        />
                    ))}
            </div>
        </div>
    );
};

export default FinishedExam;
