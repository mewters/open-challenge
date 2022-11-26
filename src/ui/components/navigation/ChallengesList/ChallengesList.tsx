import React from 'react';
import { ChallengeStructure } from '@typing/ChallengeInterface';
import {
    Collapse,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Typography,
} from '@mui/material';
import { TextService } from '@services/Text/TextService';
import {
    ChallengeLink,
    LinkList,
    LinkListItem,
    StyledList,
} from './ChallengesList.style';
import Link from 'next/link';
// import { Component } from './ChallengesList.style';

export interface ChallengesListProps {
    path: string;
    challenges: ChallengeStructure[];
    onOpenDirectory: (directoryPath: string) => void;
    selectedDirectory: string;
}

const ChallengesList: React.FC<ChallengesListProps> = ({
    path,
    challenges,
    onOpenDirectory,
    selectedDirectory,
}) => {
    function getPath(challengeDirectory: ChallengeStructure) {
        return `${path}/${challengeDirectory.path}`;
    }

    function isOpen(challengeDirectory: ChallengeStructure) {
        return selectedDirectory === getPath(challengeDirectory);
    }

    return (
        <StyledList>
            {challenges.map((challengeDirectory) => (
                <ListItem key={challengeDirectory.path}>
                    <StyledList
                        subheader={
                            !challengeDirectory.challenges && (
                                <ListSubheader component={'div'} sx={{ py: 2 }}>
                                    <Typography variant={'h2'}>
                                        {TextService.URLToTitle(
                                            challengeDirectory.path
                                        )}
                                    </Typography>
                                </ListSubheader>
                            )
                        }
                    >
                        {challengeDirectory.challenges && (
                            <ListItemButton
                                onClick={() =>
                                    onOpenDirectory(getPath(challengeDirectory))
                                }
                            >
                                <ListItemText
                                    primary={TextService.URLToTitle(
                                        challengeDirectory.path.replace(
                                            /^(\d+)-/,
                                            ''
                                        )
                                    )}
                                    primaryTypographyProps={{
                                        color: 'textSecondary',
                                        variant: 'h3',
                                        sx: { fontWeight: 'normal' },
                                    }}
                                />
                                <ListItemIcon>
                                    <i
                                        className={`fas fa-fw fa-chevron-${
                                            isOpen(challengeDirectory)
                                                ? 'up'
                                                : 'down'
                                        }`}
                                    />
                                </ListItemIcon>
                            </ListItemButton>
                        )}
                        <ListItem>
                            {challengeDirectory.children && (
                                <ChallengesList
                                    challenges={challengeDirectory.children}
                                    path={getPath(challengeDirectory)}
                                    onOpenDirectory={onOpenDirectory}
                                    selectedDirectory={selectedDirectory}
                                />
                            )}
                            {challengeDirectory.challenges && (
                                <Collapse
                                    in={isOpen(challengeDirectory)}
                                    timeout="auto"
                                    unmountOnExit
                                >
                                    <LinkList>
                                        {challengeDirectory.challenges.map(
                                            (challenge) => (
                                                <LinkListItem
                                                    key={challenge.id}
                                                >
                                                    <Link
                                                        href={`/challenges${path}/${challengeDirectory.path}/${challenge.id}`}
                                                        passHref
                                                    >
                                                        <ChallengeLink>
                                                            {challenge.title}
                                                        </ChallengeLink>
                                                    </Link>
                                                </LinkListItem>
                                            )
                                        )}
                                    </LinkList>
                                </Collapse>
                            )}
                        </ListItem>
                    </StyledList>
                </ListItem>
            ))}
        </StyledList>
    );
};

export default ChallengesList;
