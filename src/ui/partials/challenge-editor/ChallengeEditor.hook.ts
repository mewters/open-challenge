import { TestsService } from '@services/Tests/TestsService';
import { Challenge } from '@typing/ChallengeInterface';
import { TestsResultsInterface } from '@typing/TestsInterface';
import { useState } from 'react';
// import { ChallengeEditorPageStore } from './ChallengeEditor.store';
// import { ChallengeEditorPageLogic } from './ChallengeEditor.logic';

export function useChallengeEditorPage() {
    // #region [ Local State ]
    const [selectedChallengeId, setSelectedChallengeId] =
        useState<string | null>(null);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [sourceCode, setSourceCode] = useState('\n\n\n');
    const [codePreview, setCodePreview] = useState('');
    const [visibleCodePreview, setVisibleCodePreview] = useState('');
    const [testsCode, setTestsCode] = useState('\n\n\n');
    const [testsResults, setTestsResults] = useState<TestsResultsInterface>();
    const [error, setError] = useState<string>();
    const [challengesList, setChallengesList] = useState<Challenge[]>([]);
    const [challengesListJSON, setChallengesListJSON] = useState('');

    // #endregion

    // #region [ Methods ]

    function runTests() {
        setError('');
        setTestsResults(undefined);
        try {
            const result = Function(codePreview)();
            const testResults = Function(
                'TestsService',
                'result',
                `const test = new TestsService();\n${testsCode}\nreturn test.getResults();`
            )(TestsService, result);
            setTestsResults(testResults);
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
                              code: sourceCode,
                              testsCode: testsCode,
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
        setChallengesList((prev) =>
            prev.filter((item) => item.id !== challengeId)
        );
    }

    function resetAllFields() {
        setSelectedChallengeId(null);
        setTitle('');
        setDescription('');
        setSourceCode('\n\n\n');
        setTestsCode('\n\n\n');
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
        loadChallengesList,
        challengesListJSON,
        setChallengesListJSON,
    };
}
