import { Link } from '@mui/material';
import React from 'react';
// import {  } from '@mui/material';
import { FooterStyled, FooterContainer, FooterCopyRight } from './Footer.style';

export interface FooterProps {
    children?: React.ReactNode;
}

const Footer: React.FC<FooterProps> = () => {
    const currentYear = new Date().getFullYear();
    return (
        <FooterStyled>
            <FooterContainer>
                <FooterCopyRight>
                    © {currentYear}{' '}
                    <Link
                        href={'https://mewters.com'}
                        target={'_blank'}
                        rel={'noopener noreferrer'}
                        color={'inherit'}
                    >
                        Mewters
                    </Link>
                </FooterCopyRight>
            </FooterContainer>
        </FooterStyled>
    );
};

export default Footer;
