import ChallengesList from '@components/navigation/ChallengesList/ChallengesList';
import {
    Box,
    CircularProgress,
    Collapse,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Typography,
} from '@mui/material';
import { TextService } from '@services/Text/TextService';
import {
    ChallengeBaseData,
    ChallengeStructure,
} from '@typing/ChallengeInterface';
import { readFile, readdir } from 'fs/promises';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';

// import { Component } from '@partials/challenges/Challenges.styled';
import { useChallengesPage } from '@partials/challenges/Challenges.hook';
// import { ChallengesPageLogic } from '@partials/challenges/Challenges.logic';
// import { ChallengesPageStore } from '@partials/challenges/Challenges.store';

interface ChallengesProps {
    title: string;
    challenges: ChallengeStructure[];
}

export default function Challenges(props: ChallengesProps) {
    const { selectedChallengeDirectory, handleOpenDirectory } =
        useChallengesPage();

    return (
        <div>
            <Typography
                variant="h1"
                color={'textPrimary'}
                align={'center'}
                sx={{ my: 3 }}
            >
                Challenges
            </Typography>

            {props.challenges.length > 0 ? (
                <ChallengesList
                    challenges={props.challenges}
                    path=""
                    onOpenDirectory={handleOpenDirectory}
                    selectedDirectory={selectedChallengeDirectory}
                />
            ) : (
                <Box sx={{ textAlign: 'center', my: 10 }}>
                    <CircularProgress />
                </Box>
            )}
        </div>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const challenges = await readFile(
        'src/data/data-source/challenges-structure.json',
        'utf8'
    );
    return {
        props: {
            title: 'Challenges',
            challenges: JSON.parse(challenges),
        },
    };
};
