import { TestRunner } from '@services/Tests/TestsService';
import { Challenge } from '@typing/ChallengeInterface';
import { TestsResultsInterface } from '@typing/TestsInterface';
import { useState } from 'react';
// import { ChallengeEditorPageStore } from './ChallengeEditor.store';
// import { ChallengeEditorPageLogic } from './ChallengeEditor.logic';

const emptyTestCode = `test.describe('', () => {
    test.it('', () => {
        const response = __challengeFunction();
        test.expect(response).toBe(true);
    });
});`;

export function useChallengeEditorPage() {
    // #region [ Local State ]
    const [selectedChallengeId, setSelectedChallengeId] =
        useState<string | null>(null);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [sourceCode, setSourceCode] = useState('\n\n\n');
    const [codePreview, setCodePreview] = useState('');
    const [visibleCodePreview, setVisibleCodePreview] = useState('');
    const [testsCode, setTestsCode] = useState(emptyTestCode);
    const [testsResults, setTestsResults] = useState<TestsResultsInterface>();
    const [error, setError] = useState<string>();
    const [challengesList, setChallengesList] = useState<Challenge[]>([]);
    const [challengesListJSON, setChallengesListJSON] = useState('');
    const isSuccessfullyTested =
        testsResults &&
        testsResults.passedTests > 0 &&
        testsResults.passedTests === testsResults.totalTests;
    const canSave = title && description && isSuccessfullyTested;

    // #endregion

    // #region [ Methods ]

    function runTests() {
        setError('');
        setTestsResults(undefined);
        try {
            TestRunner.run(codePreview, testsCode)
                .then((results: TestsResultsInterface) => {
                    setTestsResults(results);
                })
                .catch((error) => {
                    setError(`${error.name}: ${error.message}`);
                });
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.name);
                setError(`${error.name}: ${error.message}`);
            }
        }
    }

    function selectChallenge(challenge: Challenge) {
        setSelectedChallengeId(challenge.id);
        setTitle(challenge.title);
        setDescription(challenge.description);
        setSourceCode(challenge.code);
        setTestsCode(challenge.testsCode);
        setError('');
        setTestsResults(undefined);
    }

    function createChallenge() {
        if (
            title &&
            description &&
            sourceCode &&
            testsCode &&
            testsResults?.passedTests === testsResults?.totalTests
        ) {
            setChallengesList((prev) => [
                ...prev,
                {
                    id: `${Date.now()}`,
                    isDone: false,
                    isCorrect: false,
                    title: title,
                    description: description,
                    code: sourceCode,
                    testsCode: testsCode,
                    answer: visibleCodePreview,
                },
            ]);
            resetAllFields();
        }
    }

    function updateChallenge(challengeId: string) {
        if (
            sourceCode &&
            testsCode &&
            testsResults?.passedTests === testsResults?.totalTests
        ) {
            setChallengesList((prev) =>
                prev.map((item) =>
                    item.id === challengeId
                        ? {
                              ...item,
                              title: title,
                              description: description,
                              code: sourceCode,
                              testsCode: testsCode,
                              answer: visibleCodePreview,
                          }
                        : item
                )
            );
            resetAllFields();
        }
    }

    function saveChallenge() {
        if (selectedChallengeId) {
            updateChallenge(selectedChallengeId);
        } else {
            createChallenge();
        }
    }

    function removeChallenge(challengeId: string) {
        if (confirm('Do you want to delete this challenge?')) {
            setChallengesList((prev) =>
                prev.filter((item) => item.id !== challengeId)
            );
        }
    }

    function duplicateChallenge(challenge: Challenge) {
        selectChallenge(challenge);
        setSelectedChallengeId(null);
    }

    function resetAllFields() {
        setSelectedChallengeId(null);
        setTitle('');
        setDescription('');
        setSourceCode('\n\n\n');
        setTestsCode(emptyTestCode);
        setTestsResults(undefined);
        setError('');
    }

    function loadChallengesList() {
        try {
            const parsedChallenges = JSON.parse(challengesListJSON);
            setChallengesList(parsedChallenges);
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
        selectedChallengeId,
        canSave,
        isSuccessfullyTested,
        title,
        setTitle,
        description,
        setDescription,
        sourceCode,
        setSourceCode,
        setCodePreview,
        setVisibleCodePreview,
        testsCode,
        setTestsCode,
        runTests,
        error,
        testsResults,
        challengesList,
        setChallengesList,
        selectChallenge,
        saveChallenge,
        removeChallenge,
        duplicateChallenge,
        loadChallengesList,
        challengesListJSON,
        setChallengesListJSON,
        resetAllFields,
    };
}
