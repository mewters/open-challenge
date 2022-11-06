import { styled, AppBar, AppBarProps } from '@mui/material';
// import { HeaderProps } from './Header';

export const HeaderAppBar = styled((props: AppBarProps) => (
    <AppBar position={'sticky'} {...props} />
))`
    &.MuiAppBar-root {
        backdrop-filter: blur(20px);
        background-color: ${({ theme }) =>
            theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, .7)'
                : 'rgba(31, 31, 40, .7)'};
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
        border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
    }

    .MuiToolbar-root {
        color: ${({ theme }) => theme.palette.text.secondary};
        height: 94px;
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        justify-content: space-between;
        gap: ${({ theme }) => theme.spacing(3)};
    }
`;

export const ElementsContainer = styled('div')`
    display: flex;
    gap: ${({ theme }) => theme.spacing(2)};
    flex-wrap: wrap;
    align-items: center;
    > div:last-of-type {
        flex: 1;
    }
`;
