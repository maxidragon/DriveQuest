import {Question} from "@/lib/interfaces.ts";
import {Button} from "@/components/ui/button.tsx";
import QuestionAsset from "@/components/question-asset.tsx";

interface QuestionCardProps {
    question: Question;
    onAnswerClick: (answerId: string) => void;
}

const QuestionCard = ({question, onAnswerClick}: QuestionCardProps) => {
    return (
        <div className="flex flex-col gap-4 items-center">
            <h1>{question.text}</h1>
            <QuestionAsset question={question}/>
            <div className="flex gap-2 items-center justify-center">
                {question.answers.map((answer, index) => (
                    <div key={index}>
                        <Button onClick={() => onAnswerClick(answer.id)}>{answer.text}</Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuestionCard
