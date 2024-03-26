import {useCallback, useEffect, useState} from "react";
import {Question} from "@/lib/interfaces.ts";
import {getRandomQuestion} from "@/lib/questions.ts";
import {useParams} from "react-router-dom";
import QuestionCard from "@/components/question-card.tsx";
import {submitAnswer} from "@/lib/answers.ts";
import {Alert} from "@/components/ui/alert.tsx";
import {t} from "i18next";
import {Button} from "@/components/ui/button.tsx";

const RandomQuestion = () => {
    const {category} = useParams<{ category: string }>();
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
        const isSubmittedAnswerCorrect = question?.answers.find(a => a.id === id)?.isCorrect;
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
            <QuestionCard question={question} onAnswerClick={handleSubmitAnswer}/>
            {isCorrect >= 0 && (isCorrect === 1 ? (
                <Alert variant="default">
                    {t('correct')}
                </Alert>
            ) : (
                <Alert variant="destructive">
                    {t('incorrect')} {t('correctAnswer')}: {question.answers.find(a => a.isCorrect)?.text}
                </Alert>
            ))}
            <Button onClick={fetchData}>{t('nextQuestion')}</Button>
        </div>
    )
};

export default RandomQuestion;
