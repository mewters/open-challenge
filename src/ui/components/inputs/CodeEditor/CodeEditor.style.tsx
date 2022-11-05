import { styled } from '@mui/material/styles';
// import { CodeEditorProps } from './CodeEditor';

export const CodeEditorContainer = styled('div', {
    shouldForwardProp: (prop) => prop !== 'readOnly',
})<{
    readonly?: boolean;
}>`
    position: relative;
    ${({ readonly }) =>
        readonly &&
        `
        &::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: rgba(255, 0, 0, 0.1);
            z-index: 1;
            pointer-events: none;
        }


    `}
`;
