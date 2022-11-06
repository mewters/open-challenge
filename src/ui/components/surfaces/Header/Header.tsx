import React, { useEffect, useRef } from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { HeaderAppBar, ElementsContainer } from './Header.style';

export interface HeaderProps {
    leftContent?: React.ReactNode;
    rightContent?: React.ReactNode;
}
const Header: React.FC<HeaderProps> = ({ leftContent, rightContent }) => {
    return (
        <HeaderAppBar position="sticky">
            <Toolbar>
                <ElementsContainer>{leftContent}</ElementsContainer>
                <ElementsContainer>{rightContent}</ElementsContainer>
            </Toolbar>
        </HeaderAppBar>
    );
};

export default Header;
