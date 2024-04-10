import { t } from "i18next";
import { useAtomValue } from "jotai";
import { useCallback, useEffect, useState } from "react";

import QuestionCard from "@/components/question-card.tsx";
import { Alert } from "@/components/ui/alert.tsx";
import { Button } from "@/components/ui/button.tsx";
import { submitAnswer } from "@/lib/answers.ts";
import { categoryAtom } from "@/lib/atoms.ts";
import { Question } from "@/lib/interfaces.ts";
import { getRandomQuestion } from "@/lib/questions.ts";

const RandomQuestion = () => {
    const category = useAtomValue(categoryAtom);
    const [question, setQuestion] = useState<Question | null>(null);
    const [isCorrect, setIsCorrect] = useState<number>(-1);

    const fetchData = useCallback(async () => {
        if (!category) return;
        const data = await getRandomQuestion(category);
        setIsCorrect(-1);
        setQuestion(data);
    }, [category]);

    const handleSubmitAnswer = async (id: string) => {
        await submitAnswer(id);
        const isSubmittedAnswerCorrect = question?.answers.find(
            (a) => a.id === id
        )?.isCorrect;
        setIsCorrect(isSubmittedAnswerCorrect ? 1 : 0);
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (!question) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col gap-4 items-center text-center">
            <QuestionCard
                question={question}
                onAnswerClick={handleSubmitAnswer}
            />
            <div className="w-1/2">
                {isCorrect >= 0 &&
                    (isCorrect === 1 ? (
                        <Alert variant="default">{t("correct")}</Alert>
                    ) : (
                        <Alert variant="destructive">
                            {t("incorrect")} {t("correctAnswer")}:{" "}
                            {question.answers.find((a) => a.isCorrect)?.text}
                        </Alert>
                    ))}
            </div>
            <Button onClick={fetchData} variant="secondary">
                {t("nextQuestion")}
            </Button>
        </div>
    );
};

export default RandomQuestion;
