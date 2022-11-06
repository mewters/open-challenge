import MainDrawer from '@components/navigation/MainDrawer/MainDrawer';
import Footer from '@components/surfaces/Footer/Footer';
import Header from '@components/surfaces/Header/Header';
import { IconButton } from '@mui/material';
import { MainDrawerStore } from '@stores/MainDrawerStore';
import { ThemeStore } from '@stores/ThemeStore';
import React from 'react';

import {
    MainContent,
    PageElementsContainer,
    Main,
} from './_PageElements.styled';
// import { PageElementsPartialLogic } from './_PageElements.logic';
// import { usePageElementsPartial } from './_PageElements.hook';

const PageElements: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const themeMode = ThemeStore.use.mode();

    return (
        <PageElementsContainer>
            <MainDrawer>abc</MainDrawer>
            <MainContent>
                <Header
                    leftContent={
                        <IconButton
                            onClick={() => MainDrawerStore.set.toggle()}
                        >
                            <i className="fas fa-fw fa-bars" />
                        </IconButton>
                    }
                    rightContent={
                        <>
                            <IconButton
                                onClick={() => ThemeStore.set.toggleTheme()}
                            >
                                <i
                                    className={`fas fa-fw fa-${
                                        themeMode === 'light' ? 'moon' : 'sun'
                                    }`}
                                />
                            </IconButton>
                        </>
                    }
                />
                <Main>{children}</Main>
                <Footer />
            </MainContent>
        </PageElementsContainer>
    );
};

export default PageElements;
