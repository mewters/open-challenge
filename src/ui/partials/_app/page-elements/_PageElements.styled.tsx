import { styled } from '@mui/material/styles';

export const PageElementsContainer = styled('div')`
    ${({ theme }) => theme.breakpoints.up('md')} {
        display: grid;
        grid-template-columns: auto 1fr;
    }
`;

export const MainContent = styled('div')`
    min-height: 100vh;
    min-width: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.palette.background.default};

    & > main {
        padding: ${({ theme }) => theme.spacing(2, 4)};
    }
`;

export const Main = styled('main')`
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;
`;
