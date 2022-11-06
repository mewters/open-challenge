import { useTheme } from '@mui/material';
import { MainDrawerStore } from '@stores/MainDrawerStore';
import React from 'react';
// import {  } from '@mui/material';
import {
    DrawerContainer,
    MainDrawerStyled,
    SmallLogo,
    BigLogo,
} from './MainDrawer.style';

export interface MainDrawerProps {
    children?: React.ReactNode;
}

const MainDrawer: React.FC<MainDrawerProps> = ({ children }) => {
    const isOpen = MainDrawerStore.use.isOpen();

    return (
        <DrawerContainer>
            <MainDrawerStyled
                open={isOpen}
                onClose={() => MainDrawerStore.set.isOpen(false)}
                variant={'temporary'}
            >
                <div>{children}</div>
            </MainDrawerStyled>
        </DrawerContainer>
    );
};

export default MainDrawer;
