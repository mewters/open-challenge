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

export interface ChallengeStructure {
    path: string;
    challenges?: { id: string; title: string }[];
    children?: ChallengeStructure[];
}
