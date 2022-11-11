import { styled } from '@mui/material/styles';

export const CodesContainer = styled('div')`
    display: flex;
    gap: ${({ theme }) => theme.spacing(2)};
    justify-content: space-between;

    > div {
        width: 100%;

        display: flex;
        flex-direction: column;
        gap: ${({ theme }) => theme.spacing()};

        margin: ${({ theme }) => theme.spacing(4, 0)};
    }
`;
