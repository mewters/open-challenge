import { useCallback, useEffect, useMemo, useState } from 'react';
import { CodeEditorRangesProps } from './CodeEditorRanges';
import { CodeEditorRangesLogic } from './CodeEditorRanges.logic';

export const useCodeEditorRanges = ({
    onChange,
    onVisibleCodeChange,
    ...props
}: CodeEditorRangesProps) => {
    // #region State
    const codeRanges = useMemo<
        {
            index: number;
            code: string;
            isEditable: boolean;
            isVisible: boolean;
        }[]
    >(() => {
        return CodeEditorRangesLogic.getCodeRanges(props.value ?? '');
    }, [props.value]);
    const [codeRangeValues, setCodeRangeValues] = useState(codeRanges);
    const initialLines = useMemo<number[]>(() => {
        return CodeEditorRangesLogic.getInitialLines(codeRangeValues);
    }, [codeRangeValues]);
    // #endregion

    // #region Methods
    const updateCodeRange = useCallback((index: number, code: string) => {
        setCodeRangeValues((prevCodeRangeValues) => {
            const newCodeRangeValues = [...prevCodeRangeValues];
            newCodeRangeValues[index].code = code;
            return newCodeRangeValues;
        });
    }, []);
    // #endregion

    // #region Effects
    useEffect(() => {
        setCodeRangeValues(codeRanges);
    }, [codeRanges]);

    useEffect(() => {
        if (onChange) {
            const code = codeRangeValues
                    .map((codeRange) => codeRange.code)
                    .join(''),
                numberOfLines = code.split('\n').length;
            onChange(code, numberOfLines);
        }
    }, [codeRangeValues, onChange]);

    useEffect(() => {
        if (onVisibleCodeChange) {
            const code = codeRangeValues
                .filter((codeRange) => codeRange.isVisible)
                .map((codeRange) => codeRange.code)
                .join('');
            onVisibleCodeChange(code);
        }
    }, [codeRangeValues, onVisibleCodeChange]);
    // #endregion

    return {
        codeRangeValues,
        updateCodeRange,
        initialLines,
    };
};
