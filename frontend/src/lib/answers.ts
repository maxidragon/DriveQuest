import {backendRequest} from "@/lib/request.ts";

export const submitAnswer = async (answerId: string) => {
    const response = await backendRequest('question/answer', 'POST', true, {answerId});
    return await response.json();
};
