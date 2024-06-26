import { t } from "i18next";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

import QuestionCard from "@/components/question-card.tsx";
import { submitAnswer } from "@/lib/answers.ts";
import { categoryAtom } from "@/lib/atoms.ts";
import { Question, UserAnswer } from "@/lib/interfaces.ts";
import { calculateExamResults, getExam } from "@/lib/questions.ts";
import { formatSeconds } from "@/lib/utils.ts";
import FinishedExam from "@/pages/exam/finished-exam.tsx";

const Exam = () => {
    const category = useAtomValue(categoryAtom);
    const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
    const [isFinished, setIsFinished] = useState<boolean>(false);
    const [result, setResult] = useState<string>("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearTimeout(timer);
    }, [timeLeft]);

    useEffect(() => {
        getExam(category).then((data) => {
            setQuestions(data);
        });
    }, [category]);

    const handleAnswer = async (answerId: string) => {
        const data = await submitAnswer(answerId);
        setUserAnswers([...userAnswers, data]);
        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setIsFinished(true);
            const calculatedResult = calculateExamResults(userAnswers);
            setResult(calculatedResult);
        }
    };
    if (!questions.length) {
        return <div>{t("loading")}</div>;
    }

    if (isFinished) {
        return (
            <FinishedExam
                userAnswers={userAnswers}
                questions={questions}
                result={result}
            />
        );
    }

    return (
        <div>
            <div>
                {t("timeLeft")}: {formatSeconds(timeLeft)}{" "}
                {currentQuestionIndex + 1}/32
            </div>
            <div className="flex flex-col gap-4 items-center text-center">
                <QuestionCard
                    question={questions[currentQuestionIndex]}
                    onAnswerClick={handleAnswer}
                />
            </div>
        </div>
    );
};

export default Exam;
