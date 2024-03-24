import {useCallback, useEffect, useState} from "react";
import {Question} from "@/lib/interfaces.ts";
import {getRandomQuestion} from "@/lib/questions.ts";
import {useParams} from "react-router-dom";
import QuestionCard from "@/components/question-card.tsx";

const RandomQuestion = () => {
    const {category} = useParams<{ category: string }>();
    const [question, setQuestion] = useState<Question | null>(null);

    const fetchData = useCallback(async () => {
        if (!category) return;
        const data = await getRandomQuestion(category);
        setQuestion(data);
    }, [category]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    if (!question) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col gap-4 items-center text-center">
            <QuestionCard question={question}/>
        </div>
    )
};

export default RandomQuestion;
