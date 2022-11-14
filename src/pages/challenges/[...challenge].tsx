import { Challenge as ChallengeInterface } from '@typing/ChallengeInterface';
import { GetStaticPaths, GetStaticProps } from 'next';
import { readFile } from 'fs/promises';
import path from 'path';
import CodeEditorRanges from '@components/inputs/CodeEditorRanges/CodeEditorRanges';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { ThemeStore } from '@stores/ThemeStore';
import TestsResults from '@components/data-display/TestsResults/TestsResults';

import { Component } from '@partials/challenges/[...challenge]/Challenge.styled';
import { useChallengePage } from '@partials/challenges/[...challenge]/Challenge.hook';
import { ChallengePageLogic } from '@partials/challenges/[...challenge]/Challenge.logic';
import { ChallengePageStore } from '@partials/challenges/[...challenge]/Challenge.store';

export interface ChallengeProps {
    title: string;
    challenge: ChallengeInterface;
}

export default function Challenge(props: ChallengeProps) {
    const {
        setChallengeCode,
        testsResults,
        error,
        isSuccessfullyTested,
        runTests,
    } = useChallengePage(props);
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
            <Typography variant={'body1'} color={'textPrimary'} sx={{ my: 4 }}>
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
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async (props) => {
    const challengesPaths: string[] = JSON.parse(
        await readFile('src/data/data-source/challenges-paths.json', 'utf8')
    );

    return {
        paths: challengesPaths.map((challengePath) => ({
            params: {
                challenge: [challengePath],
            },
        })),
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps = async (context) => {
    try {
        const challengePath = context.params?.challenge as string[];
        const challengeId = challengePath.pop();
        const challengeFilePath = path.join(
            'src/data/data-source/challenges',
            `${challengePath.join('/')}.json`
        );
        const file = await readFile(challengeFilePath, 'utf8');

        const challenge = JSON.parse(file).find(
            (challenge: ChallengeInterface) => challenge.id === challengeId
        );

        if (!challenge) {
            throw new Error('Challenge not found');
        }

        return {
            props: {
                title: `Challenge - ${challenge.title}`,
                challenge,
            },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
};
