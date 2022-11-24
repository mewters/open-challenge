import {
    DescriptionInterface,
    ItInterface,
    ExpectInterface,
    TestsResultsInterface,
} from '@typing/TestsInterface';

export class TestsService {
    private beforeEachs: Function[] = [];
    private afterEachs: Function[] = [];
    private afterAlls: Function[] = [];
    private beforeAlls: Function[] = [];
    private passedTests = 0;
    private failedTests = 0;
    private get totalTests() {
        return this.passedTests + this.failedTests;
    }
    private stats = [] as DescriptionInterface[];
    private currentDescription = {
        name: '',
        it: [],
    } as DescriptionInterface;
    private currentIt = {
        name: '',
        expects: [],
    } as ItInterface;

    beforeEach(fn: Function) {
        this.beforeEachs.push(fn);
    }

    afterEach(fn: Function) {
        this.afterEachs.push(fn);
    }

    beforeAll(fn: Function) {
        this.beforeAlls.push(fn);
    }

    afterAll(fn: Function) {
        this.afterAlls.push(fn);
    }

    expect(value: unknown) {
        return {
            toBe: (expected: unknown) => {
                this.createMatcher(
                    value,
                    expected,
                    value === expected,
                    `Expected: {{expected}} / Received: {{value}}`
                );
            },
            toBeTruthy: () => {
                this.createMatcher(
                    value,
                    undefined,
                    !!value,
                    `Expected: {{value}} to be truthy`
                );
            },
            toBeFalsy: () => {
                this.createMatcher(
                    value,
                    undefined,
                    !value,
                    `Expected: {{value}} to be falsy`
                );
            },
            toBeGreaterThan: (expected: number) => {
                this.createMatcher(
                    value,
                    expected,
                    (value as number) > expected,
                    `Expected: {{value}} to be greater than {{expected}}`
                );
            },
            toBeGreaterThanOrEqual: (expected: number) => {
                this.createMatcher(
                    value,
                    expected,
                    (value as number) >= expected,
                    `Expected: {{value}} to be greater than or equal to {{expected}}`
                );
            },
            toBeLessThan: (expected: number) => {
                this.createMatcher(
                    value,
                    expected,
                    (value as number) < expected,
                    `Expected: {{value}} to be less than {{expected}}`
                );
            },
            toBeLessThanOrEqual: (expected: number) => {
                this.createMatcher(
                    value,
                    expected,
                    (value as number) <= expected,
                    `Expected: {{value}} to be less than or equal to {{expected}}`
                );
            },
            toBeDefined: () => {
                this.createMatcher(
                    JSON.stringify(value as object),
                    undefined,
                    value !== undefined,
                    `Expected: {{value}} to be defined`
                );
            },
            toBeUndefined: () => {
                this.createMatcher(
                    JSON.stringify(value as object),
                    undefined,
                    value === undefined,
                    `Expected: {{value}} to be undefined`
                );
            },
            toBeNull: () => {
                this.createMatcher(
                    JSON.stringify(value as object),
                    null,
                    value === null,
                    `Expected: {{value}} to be null`
                );
            },
            toBeNaN: () => {
                this.createMatcher(
                    JSON.stringify(value as object),
                    NaN,
                    Number.isNaN(value),
                    `Expected: {{value}} to be NaN`
                );
            },
            toBeInstanceOf: (expected: any) => {
                this.createMatcher(
                    value,
                    expected,
                    value instanceof expected,
                    `Expected: {{value}} to be instance of {{expected}}`
                );
            },
            toContain: (expected: unknown) => {
                this.createMatcher(
                    JSON.stringify(value as object),
                    expected,
                    (value as unknown[]).includes(expected),
                    `Expected: {{value}} to contain {{expected}}`
                );
            },
            toHaveLength: (expected: number) => {
                this.createMatcher(
                    JSON.stringify(value as object),
                    expected,
                    (value as unknown[]).length === expected,
                    `Expected: {{value}} to have length {{expected}}`
                );
            },
            toHaveProperty: (expected: string) => {
                this.createMatcher(
                    JSON.stringify(value as object),
                    expected,
                    (value as object).hasOwnProperty(expected),
                    `Expected: {{value}} to have property {{expected}}`
                );
            },
            toMatch: (expected: RegExp) => {
                this.createMatcher(
                    value,
                    expected,
                    expected.test(value as string),
                    `Expected: {{value}} to match {{expected}}`
                );
            },
            not: {
                toBe: (expected: unknown) => {
                    this.createMatcher(
                        value,
                        expected,
                        value !== expected,
                        `Expected: not {{expected}} / Received: {{value}}`
                    );
                },
                toBeInstanceOf: (expected: any) => {
                    this.createMatcher(
                        value,
                        expected,
                        !(value instanceof expected),
                        `Expected: {{value}} not to be instance of {{expected}}`
                    );
                },
                toContain: (expected: unknown) => {
                    this.createMatcher(
                        JSON.stringify(value as object),
                        expected,
                        !(value as unknown[]).includes(expected),
                        `Expected: {{value}} not to contain {{expected}}`
                    );
                },
                toHaveLength: (expected: number) => {
                    this.createMatcher(
                        JSON.stringify(value as object),
                        expected,
                        (value as unknown[]).length !== expected,
                        `Expected: {{value}} not to have length {{expected}}`
                    );
                },
                toHaveProperty: (expected: string) => {
                    this.createMatcher(
                        JSON.stringify(value as object),
                        expected,
                        !(value as object).hasOwnProperty(expected),
                        `Expected: {{value}} not to have property {{expected}}`
                    );
                },
                toMatch: (expected: RegExp) => {
                    this.createMatcher(
                        value,
                        expected,
                        !expected.test(value as string),
                        `Expected: {{value}} not to match {{expected}}`
                    );
                },
            },
        };
    }

    private createMatcher(
        value: unknown,
        expected: unknown,
        status: boolean,
        message: string = 'Expected: {{value}} / Received: {{expected}}'
    ) {
        const expectation = {
            name: message
                .replace('{{value}}', `${value}`)
                .replace('{{expected}}', `${expected}`),
            status: status,
        } as ExpectInterface;

        this.currentIt.expects.push(expectation);
        this.updateTestsResultsNumber(status);
    }

    private updateTestsResultsNumber(status: boolean) {
        if (status) {
            this.passedTests++;
        } else {
            this.failedTests++;
        }
    }

    async it(description: string, fn: Function) {
        this.beforeEachs.forEach((fn) => fn.apply(this));

        this.currentIt = {
            name: description,
            expects: [],
        };

        if (fn.constructor.name === 'AsyncFunction') {
            await fn.apply(this);
        } else {
            fn.apply(this);
        }

        this.afterEachs.forEach((fn) => fn.apply(this));

        this.currentDescription.it.push(this.currentIt);
    }

    async describe(description: string, fn: Function) {
        this.beforeAlls.forEach((fn) => fn.apply(this));

        this.currentDescription = {
            name: description,
            it: [],
        };

        if (fn.constructor.name === 'AsyncFunction') {
            await fn.apply(this);
        } else {
            fn.apply(this);
        }

        this.afterAlls.forEach((fn) => fn.apply(this));

        this.stats.push(this.currentDescription);
    }

    getResults(): TestsResultsInterface {
        return {
            totalTests: this.totalTests,
            passedTests: this.passedTests,
            failedTests: this.failedTests,
            stats: this.stats,
        };
    }

    showResults() {
        console.log(`Tests: ${this.passedTests} passed, ${this.totalTests} total
`);
        this.stats.forEach((description) => {
            console.log(description.name);
            description.it.forEach((it) => {
                console.log(`    ${it.name}`);
                it.expects.forEach((expectation) => {
                    console.log(
                        `        ${expectation.status ? '√' : 'X'} ${
                            expectation.name
                        }`
                    );
                });
            });
        });
    }
}
