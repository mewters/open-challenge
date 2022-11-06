import { Button, Drawer, Theme, styled } from '@mui/material';
// import { MainDrawerProps } from './MainDrawer';

// const drawerWidth = 210;
const drawerWidth = 260;
const drawerWidthClosed = 65;

export const DrawerContainer = styled('div')`
    /* width: ${drawerWidthClosed}px; */
`;

export const MainDrawerStyled = styled(Drawer)`
    grid-area: drawer;
    flex-shrink: 0;

    ${({ open, theme }) => (open ? openStyles(theme) : closedStyles(theme))}

    &:not(.MuiModal-hidden) {
        width: ${drawerWidth}px;
    }

    &.MuiDrawer-docked,
    .MuiDrawer-paper {
        overflow: hidden;
        transition: width 0.2s ease-in-out;
        border-right: 1px solid ${({ theme }) => theme.palette.divider};
        background-image: initial;
        background-color: ${({ theme }) =>
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.background.paper};
        padding: ${({ theme }) =>
            theme.spacing() + ' ' + theme.spacing() + ' ' + theme.spacing(10)};
        overflow-y: auto;
    }
`;

export const LogoButton = styled(Button)``;

export const SmallLogo = styled('img', {
    shouldForwardProp: (prop) => prop !== 'isOpen',
})<{ isOpen: boolean }>`
    display: ${({ isOpen }) => (isOpen ? 'none' : 'block')};
    width: 100%;
    max-width: 34px;
`;
export const BigLogo = styled(SmallLogo)`
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    max-width: initial;
`;

function openStyles(theme: Theme): string {
    return `
    .MuiDrawer-paper {
        width: ${drawerWidth}px;
    }
    `;
}

function closedStyles(theme: Theme): string {
    return `
    visibility: initial !important;

    &.MuiDrawer-docked {
        width: 0px;
    }
    .MuiDrawer-paper {
        width: 0px;
        visibility: initial !important;
        transform: initial !important;
        box-shadow: none;
    }
    `;
}
