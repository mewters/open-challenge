import CodeEditor from '@components/inputs/CodeEditor/CodeEditor';
import CodeEditorRanges from '@components/inputs/CodeEditorRanges/CodeEditorRanges';
import {
    Button,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { GetStaticProps } from 'next';

import { CodesContainer } from '@partials/challenge-editor/ChallengeEditor.styled';
import { useChallengeEditorPage } from '@partials/challenge-editor/ChallengeEditor.hook';
import { ThemeStore } from '@stores/ThemeStore';
import TestsResults from '@components/data-display/TestsResults/TestsResults';
import { ReactSortable } from 'react-sortablejs';
// import { ChallengeEditorPageLogic } from '@partials/challenge-editor/ChallengeEditor.logic';
// import { ChallengeEditorPageStore } from '@partials/challenge-editor/ChallengeEditor.store';

interface ChallengeEditorProps {
    title: string;
}

export default function ChallengeEditor(props: ChallengeEditorProps) {
    const {
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
    } = useChallengeEditorPage();
    const editorTheme = ThemeStore.use.editorTheme();
    return (
        <div>
            <Stack gap={2} sx={{ mt: 1 }}>
                <Typography
                    variant={'h1'}
                    color={'textPrimary'}
                    align={'center'}
                >
                    Challenge Editor
                </Typography>
                <TextField
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    label="Title"
                    fullWidth
                />
                <TextField
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    label="Description"
                    fullWidth
                    multiline
                    rows={8}
                />
            </Stack>

            <CodesContainer>
                <div>
                    <Typography variant="h2" color={'textPrimary'}>
                        Source Code
                    </Typography>
                    <CodeEditor
                        value={sourceCode}
                        onChange={(value) => setSourceCode(value)}
                        theme={editorTheme}
                    />

                    <div>
                        <Button
                            onClick={() =>
                                navigator.clipboard.writeText(
                                    '[---editable---\n\n---editable---]'
                                )
                            }
                        >
                            [---editable---]
                        </Button>
                        <Button
                            onClick={() =>
                                navigator.clipboard.writeText(
                                    '[---hidden---\n\n---hidden---]'
                                )
                            }
                        >
                            [---hidden---]
                        </Button>
                    </div>
                </div>
                <div>
                    <Typography variant="h2" color={'textPrimary'}>
                        Code Preview
                    </Typography>
                    <CodeEditorRanges
                        value={sourceCode}
                        onChange={(value) => setCodePreview(value)}
                        onVisibleCodeChange={(value) =>
                            setVisibleCodePreview(value)
                        }
                        theme={editorTheme}
                    />
                </div>
            </CodesContainer>
            <Typography variant="h2" color={'textPrimary'}>
                Test
            </Typography>
            <CodeEditor
                value={testsCode}
                onChange={(value) => setTestsCode(value)}
                theme={editorTheme}
            />

            <Button
                sx={{ my: 4 }}
                variant={'contained'}
                onClick={runTests}
                disabled={!sourceCode || !testsCode}
            >
                Run Tests
            </Button>

            {error && (
                <Typography variant={'body1'} color={'error.main'}>
                    {error}
                </Typography>
            )}

            {isSuccessfullyTested && (
                <Typography
                    variant={'body1'}
                    color={'textSecondary'}
                    sx={{ mb: 3 }}
                >
                    Congratulations! You passed all tests!
                </Typography>
            )}
            {testsResults ? (
                <TestsResults {...testsResults} />
            ) : (
                <Typography variant={'body1'} color={'error.main'}>
                    Run tests to see results
                </Typography>
            )}

            <Stack
                gap={2}
                sx={{ mt: 2 }}
                direction={'row'}
                justifyContent={'end'}
            >
                <Button variant={'outlined'} onClick={resetAllFields}>
                    {selectedChallengeId ? 'Cancel' : 'Reset'}
                </Button>
                <Button
                    variant={'contained'}
                    onClick={saveChallenge}
                    disabled={!canSave}
                >
                    {selectedChallengeId ? 'Update' : 'Save'} Challenge
                </Button>
            </Stack>

            <List>
                <ReactSortable
                    list={challengesList}
                    setList={setChallengesList}
                >
                    {challengesList.map((challenge) => (
                        <ListItem
                            key={challenge.id}
                            sx={{ pr: 12 }}
                            secondaryAction={
                                <>
                                    <IconButton
                                        onClick={() =>
                                            duplicateChallenge(challenge)
                                        }
                                    >
                                        <i className="fas fa-copy" />
                                    </IconButton>
                                    <IconButton
                                        onClick={() =>
                                            removeChallenge(challenge.id)
                                        }
                                    >
                                        <i className="fas fa-trash" />
                                    </IconButton>
                                </>
                            }
                        >
                            <ListItemButton
                                onClick={() => selectChallenge(challenge)}
                            >
                                <ListItemText
                                    primary={challenge.title}
                                    secondary={challenge.description}
                                    primaryTypographyProps={{
                                        color: 'textPrimary',
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </ReactSortable>
            </List>

            <Button
                onClick={() =>
                    setChallengesListJSON(
                        JSON.stringify(challengesList, null, 4)
                    )
                }
            >
                Save list to JSON
            </Button>
            <Button onClick={loadChallengesList}>Load list from JSON</Button>
            <TextField
                fullWidth
                multiline
                rows={8}
                value={challengesListJSON}
                onChange={(e) => setChallengesListJSON(e.target.value)}
            />
        </div>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            title: 'Challenge Editor',
        },
    };
};
