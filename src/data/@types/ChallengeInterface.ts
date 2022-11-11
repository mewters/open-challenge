export interface Challenge {
    id: string;
    isDone: boolean;
    isCorrect: boolean;
    title: string;
    description: string;
    code: string;
    testsCode: string;
    answer?: string;
}
