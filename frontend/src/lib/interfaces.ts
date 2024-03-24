export interface Question {
    id: string;
    text: string;
    assetName?: string;
    answers: Answer[];
}

export interface Answer {
    id: string;
    text: string;
    isCorrect: boolean;
    userAnswers: UserAnswer[];
}

export interface UserAnswer {
    id: string;
    userId: string;
    answerId: string;
}