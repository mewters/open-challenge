import React from 'react';
import Editor from '@monaco-editor/react';
// import {  } from '@mui/material';
import { CodeEditorContainer } from './CodeEditor.style';
import { useCodeEditor } from './useCodeEditor.hook';

export interface CodeEditorProps {
    initialLineNumber?: number;
    theme?: string;
    language?: 'javascript';
    value?: string;
    onChange?: (value: string) => void;
    readOnly?: boolean;
}
const CodeEditor: React.FC<CodeEditorProps> = (props) => {
    const {
        currentTheme,
        containerRef,
        handleEditorDidMount,
        handleEditorChange,
        handleLineNumbers,
    } = useCodeEditor(props);

    return (
        <CodeEditorContainer ref={containerRef} readonly={props.readOnly}>
            <Editor
                onMount={handleEditorDidMount}
                defaultLanguage={props.language ?? 'javascript'}
                theme={currentTheme ?? 'vs-dark'}
                value={props.value}
                onChange={handleEditorChange}
                options={{
                    lineNumbers: handleLineNumbers,
                    cursorBlinking: 'smooth',
                    cursorSmoothCaretAnimation: true,
                    formatOnPaste: true,
                    formatOnType: true,
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    wordWrap: 'on',
                    wrappingStrategy: 'advanced',
                    minimap: {
                        enabled: false,
                    },
                    overviewRulerLanes: 0,
                    readOnly: props.readOnly,
                }}
            />
        </CodeEditorContainer>
    );
};

export default CodeEditor;
