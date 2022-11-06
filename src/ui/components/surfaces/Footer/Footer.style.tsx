import { styled, Box, Typography } from '@mui/material';
// import { FooterProps } from './Footer';

export const FooterStyled = styled(Box)`
    position: relative;
    z-index: 5;
    margin-top: auto;
    color: ${({ theme }) => theme.palette.text.secondary};
    ${({ theme }) => theme.breakpoints.down('md')} {
        margin-bottom: ${({ theme }) => theme.spacing(4)};
    }
`;

export const FooterContainer = styled('div')`
    height: 50px;
    margin: 0 auto;
    text-align: center;
`;

export const FooterCopyRight = styled(Typography)`
    font-size: ${({ theme }) => theme.typography.caption.fontSize};
`;
