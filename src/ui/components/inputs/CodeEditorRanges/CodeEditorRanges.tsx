import React from 'react';
import CodeEditor, { CodeEditorProps } from '../CodeEditor/CodeEditor';
import { CodeEditorRangesContainer } from './CodeEditorRanges.style';
import { useCodeEditorRanges } from './useCodeEditorRanges.hook';
// import {  } from '@mui/material';

export interface CodeEditorRangesProps extends CodeEditorProps {
    onVisibleCodeChange?: (visibleCode: string) => void;
}

const CodeEditorRanges: React.FC<CodeEditorRangesProps> = (props) => {
    const { codeRangeValues, initialLines, updateCodeRange } =
        useCodeEditorRanges(props);
    return (
        <CodeEditorRangesContainer>
            {codeRangeValues.map((codeRange) =>
                codeRange.isVisible && codeRange.code ? (
                    <CodeEditor
                        key={codeRange.index}
                        {...props}
                        value={codeRange.code}
                        readOnly={!codeRange.isEditable}
                        initialLineNumber={initialLines[codeRange.index]}
                        onChange={(value) => {
                            updateCodeRange(codeRange.index, value);
                        }}
                    />
                ) : null
            )}
        </CodeEditorRangesContainer>
    );
};

export default CodeEditorRanges;
