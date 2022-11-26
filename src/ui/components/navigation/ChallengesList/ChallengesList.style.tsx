import { List, ListItem, styled, Typography } from '@mui/material';
import { ChallengesListProps } from './ChallengesList';

export const StyledList = styled(List)`
    &.MuiList-root {
        padding: 0;
    }
    .MuiListItem-root {
        display: list-item;
        padding: 0;
    }
`;

export const LinkList = styled(List)`
    &.MuiList-root {
        display: flex;
        flex-direction: column;
        gap: ${({ theme }) => theme.spacing(0.5)};
    }
`;
export const LinkListItem = styled(ListItem)`
    &.MuiListItem-root {
        display: list-item;
    }
`;

export const ChallengeLink = styled(Typography)`
    position: relative;
    color: ${({ theme }) => theme.palette.text.secondary};
    padding: ${({ theme }) => theme.spacing(1, 1, 1, 5)};

    &:hover::before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: ${({ theme }) => theme.palette.action.hover};
    }
`;
