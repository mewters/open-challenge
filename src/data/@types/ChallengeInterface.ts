export interface ChallengeBaseData {
    id: string;
    title: string;
}

export interface Challenge extends ChallengeBaseData {
    isDone: boolean;
    isCorrect: boolean;
    description: string;
    code: string;
    testsCode: string;
    answer?: string;
}

export interface ChallengeStructure {
    path: string;
    challenges?: ChallengeBaseData[];
    children?: ChallengeStructure[];
}
