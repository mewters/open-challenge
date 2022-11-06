import React, { PropsWithChildren, useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import lightTheme from './light-theme';
import darkTheme from './dark-theme';
import { ThemeStore } from '@stores/ThemeStore';

const ThemeContainer: React.FC<PropsWithChildren> = ({ children }) => {
    const themeMode = ThemeStore.use.mode();

    useEffect(() => {
        const savedTheme =
            (localStorage?.getItem('theme') as 'light' | 'dark') ?? 'dark';
        ThemeStore.set.mode(savedTheme);
    }, []);

    return (
        <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
            {children}
        </ThemeProvider>
    );
};

export default ThemeContainer;
