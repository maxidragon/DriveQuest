import {backendRequest} from "@/lib/request.ts";
import {Answer} from "@/lib/interfaces.ts";

export const getQuestions = async (page: number, category: string, search?: string) => {
    let url = `question?page=${page}&category=${category}`;
    if (search) {
        url += `&search=${search}`;
    }
    const response = await backendRequest(url, "GET", true);
    return await response.json();
};

export const calculateAttempts = (answers: Answer[]) => {
    const userAnswers = answers.flatMap((answer) => answer.userAnswers);
    const correctAnswerIds = answers.find((answer) => answer.isCorrect)?.id;
    const correctAnswers = userAnswers.filter((userAnswer) => userAnswer.answerId === correctAnswerIds).length;
    const allAnswers = userAnswers.length;
    return `${correctAnswers}/${allAnswers}`;
};