import { Challenge as ChallengeInterface } from '@typing/ChallengeInterface';
import { GetStaticPaths, GetStaticProps } from 'next';
import { readFile } from 'fs/promises';
import path from 'path';
import CodeEditorRanges from '@components/inputs/CodeEditorRanges/CodeEditorRanges';
import {
    Box,
    Button,
    CircularProgress,
    Stack,
    Typography,
} from '@mui/material';
import { ThemeStore } from '@stores/ThemeStore';
import TestsResults from '@components/data-display/TestsResults/TestsResults';

import { Component } from '@partials/challenges/[challengeFolder]/[challengeFile]/ChallengeId.styled';
import { useChallengeIdPage } from '@partials/challenges/[challengeFolder]/[challengeFile]/ChallengeId.hook';
import { ChallengeIdPageLogic } from '@partials/challenges/[challengeFolder]/[challengeFile]/ChallengeId.logic';
import { ChallengeIdPageStore } from '@partials/challenges/[challengeFolder]/[challengeFile]/ChallengeId.store';
import Link from 'next/link';
import { useRouter } from 'next/router';

export interface ChallengeProps {
    title: string;
    challenge: ChallengeInterface;
    previousChallenge: ChallengeInterface | null;
    nextChallenge: ChallengeInterface | null;
}

export default function ChallengeId(props: ChallengeProps) {
    const router = useRouter();
    const {
        setChallengeCode,
        testsResults,
        error,
        isSuccessfullyTested,
        runTests,
    } = useChallengeIdPage(props);
    const editorTheme = ThemeStore.use.editorTheme();

    if (!props.challenge) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 10,
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div>
            <Typography variant={'h1'} color={'textPrimary'} sx={{ my: 4 }}>
                {props.challenge.title}
            </Typography>
            <Typography
                variant={'body1'}
                color={'textPrimary'}
                sx={{ my: 4, whiteSpace: 'pre-line' }}
            >
                {props.challenge.description}
            </Typography>
            <CodeEditorRanges
                value={props.challenge.code}
                onChange={setChallengeCode}
                theme={editorTheme}
            />

            <Button sx={{ my: 4 }} variant={'contained'} onClick={runTests}>
                Test it
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
            {testsResults && <TestsResults {...testsResults} />}

            <Stack
                direction={'row'}
                justifyContent={'space-between'}
                sx={{ mt: 10 }}
            >
                {props.previousChallenge ? (
                    <Link
                        href={{
                            pathname:
                                '/challenges/[challengeFolder]/[challengeFile]/[challengeId]',
                            query: {
                                challengeFolder: router.query.challengeFolder,
                                challengeFile: router.query.challengeFile,
                                challengeId: props.previousChallenge?.id,
                            },
                        }}
                    >
                        <Button variant={'outlined'}>Previous</Button>
                    </Link>
                ) : (
                    <span />
                )}

                {props.nextChallenge ? (
                    <Link
                        href={{
                            pathname:
                                '/challenges/[challengeFolder]/[challengeFile]/[challengeId]',
                            query: {
                                challengeFolder: router.query.challengeFolder,
                                challengeFile: router.query.challengeFile,
                                challengeId: props.nextChallenge?.id,
                            },
                        }}
                    >
                        <Button variant={'outlined'}>Next</Button>
                    </Link>
                ) : (
                    <span />
                )}
            </Stack>
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async (props) => {
    const challengesPaths: string[] = JSON.parse(
        await readFile('src/data/data-source/challenges-paths.json', 'utf8')
    );

    function getParamsFromPath(path: string): string[] {
        const url = path.replace('src/data/data-source/challenges/', '');
        return url.split('/');
    }

    return {
        paths: challengesPaths.map((challengePath) => {
            const [challengeFolder, challengeFile, challengeId] =
                getParamsFromPath(challengePath);

            return {
                params: {
                    challengeFolder,
                    challengeFile,
                    challengeId,
                },
            };
        }),
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    try {
        const challengeId = (context.params?.challengeId as string).replace(
            /__.*/,
            ''
        );

        const challengeFilePath = path.join(
            'src/data/data-source/challenges',
            context.params?.challengeFolder as string,
            `${context.params?.challengeFile as string}.json`
        );
        const file = await readFile(challengeFilePath, 'utf8');
        const challenges: ChallengeInterface[] = JSON.parse(file);

        const challengeIndex = challenges.findIndex(
            (challenge: ChallengeInterface) => challenge.id === challengeId
        );

        if (challengeIndex === -1) {
            throw new Error('Challenge not found');
        }

        const challenge = challenges[challengeIndex];
        const previousChallenge =
            challengeIndex > 0 ? challenges[challengeIndex - 1] : null;
        const nextChallenge =
            challengeIndex < challenges.length - 1
                ? challenges[challengeIndex + 1]
                : null;

        return {
            props: {
                title: `Challenge - ${challenge.title}`,
                challenge,
                previousChallenge,
                nextChallenge,
            },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
};
