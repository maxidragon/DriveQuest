import {backendRequest} from "@/lib/request.ts";
import {Answer, UserAnswer} from "@/lib/interfaces.ts";

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

export const getRandomQuestion = async (category: string) => {
    const response = await backendRequest(`question/random?category=${category}`, "GET", true);
    return await response.json();
};

export const getQuestionById = async (id: string) => {
    const response = await backendRequest(`question/${id}`, "GET", true);
    return await response.json();
};

export const getExam = async (category: string) => {
    const response = await backendRequest(`question/exam?category=${category}`, "GET", true);
    return await response.json();
};

export const calculateExamResults = (userAnswers: UserAnswer[]) => {
    const correctAnswers = userAnswers.filter((userAnswer) => userAnswer.answer?.isCorrect).length;
    return `${correctAnswers}/32`;
};