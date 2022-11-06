export interface DescriptionInterface {
    name: string;
    it: ItInterface[];
}

export interface ItInterface {
    name: string;
    expects: ExpectInterface[];
}

export interface ExpectInterface {
    name: string;
    status: boolean;
}

export interface TestsResultsInterface {
    totalTests: number;
    passedTests: number;
    failedTests: number;
    stats: DescriptionInterface[];
}
