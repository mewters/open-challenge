import { useState } from 'react';
import { TestsResultsInterface } from '@typing/TestsInterface';
import { ChallengeProps } from 'pages/challenges/[...challenge]';
import { TestsService } from '@services/Tests/TestsService';
// import { ChallengePageStore } from './Challenge.store';
// import { ChallengePageLogic } from './Challenge.logic';

export function useChallengePage(props: ChallengeProps) {
    // #region [ Local State ]
    const [challengeCode, setChallengeCode] = useState(props?.challenge?.code);
    const [testsResults, setTestsResults] = useState<TestsResultsInterface>();
    const [error, setError] = useState<string>();
    const isSuccessfullyTested =
        testsResults &&
        testsResults.passedTests > 0 &&
        testsResults.passedTests === testsResults.totalTests;
    // #endregion

    // #region [ Methods ]
    function runTests() {
        setError('');
        setTestsResults(undefined);
        try {
            const result = Function(challengeCode)();
            const testResults = Function(
                'TestsService',
                'result',
                `const test = new TestsService();\n${props.challenge.testsCode}\nreturn test.getResults();`
            )(TestsService, result);
            setTestsResults(testResults);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.name);
                setError(`${error.name}: ${error.message}`);
            }
        }
    }
    // #endregion

    // #region [ Effects ]

    // #endregion

    return {
        setChallengeCode,
        testsResults,
        error,
        isSuccessfullyTested,
        runTests,
    };
}
