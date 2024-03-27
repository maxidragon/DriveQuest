import {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {calculateAttempts, getQuestionById} from "@/lib/questions.ts";
import {Question as QuestionType} from "@/lib/interfaces.ts";
import {t} from "i18next";
import {cn} from "@/lib/utils.ts";
import QuestionAsset from "@/components/question-asset.tsx";

const Question = () => {
    const {id} = useParams<{ id: string }>();
    const [question, setQuestion] = useState<QuestionType | null>(null);

    const fetchData = useCallback(async () => {
        if (!id) return;
        const data = await getQuestionById(id);
        setQuestion(data);
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (!question) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col gap-4 items-center text-center">
            <div>
                {t('question')}: {question.text}
            </div>
            <div className="flex flex-col gap-2">
                {t('answers')}:
                <div className="flex gap-2">
                    {question.answers.map((answer) => (
                        <div key={answer.id}
                             className={cn("p-2 rounded-md text-black", answer.isCorrect ? "bg-green-500" : "bg-red-500")}>
                            {answer.text}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <QuestionAsset question={question}/>
            </div>
            <div className="flex gap-2">
                {t('yourAnswers')}: {calculateAttempts(question.answers)}
            </div>

        </div>
    )
};

export default Question;