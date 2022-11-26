import { OnMount, OnChange, loader } from '@monaco-editor/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CodeEditorProps } from './CodeEditor';
import type monaco from 'monaco-editor';

export const useCodeEditor = (props: CodeEditorProps) => {
    // #region State
    const [currentTheme, setCurrentTheme] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();
    // #endregion

    // #region Methods
    const updateEditorHeight = useCallback(() => {
        const container = containerRef.current;
        const editor = editorRef.current;

        if (!container || !editor) {
            return;
        }

        const contentHeight = Math.min(1000, editor.getContentHeight());

        if (container.offsetHeight === contentHeight) {
            return;
        }

        container.style.height = `${contentHeight}px`;
        container.style.width = `100%`;
        try {
            editor.layout({
                width: container.offsetWidth,
                height: container.offsetHeight,
            });
        } finally {
        }
    }, []);

    const handleLineNumbers = useCallback(
        (lineNumber: number) =>
            (lineNumber + (props.initialLineNumber ?? 1) - 1).toString(),
        [props.initialLineNumber]
    );

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;
        setTimeout(() => {
            updateEditorHeight();
            loadTheme(props.theme as string);
        }, 200);
    };
    const handleEditorChange: OnChange = (value, event) => {
        updateEditorHeight();
        const editor = editorRef.current;
        editor &&
            value !== undefined &&
            props.onChange?.(value, editor.getModel()?.getLineCount() || 0);
    };

    const loadTheme = useCallback(async (themeName: string) => {
        try {
            await loadEditorTheme(themeName);
            setCurrentTheme(themeName);
        } catch (e) {
            setCurrentTheme(themeName);
        }
    }, []);
    // #endregion

    // #region Effects
    useEffect(() => {
        updateEditorHeight();
    }, [updateEditorHeight]);

    useEffect(() => {
        props.theme && loadTheme(props.theme);
    }, [loadTheme, props.theme]);

    // #endregion

    return {
        currentTheme,
        containerRef,
        handleEditorDidMount,
        handleEditorChange,
        handleLineNumbers,
    };
};

const loadEditorTheme = (theme: string) => {
    return new Promise((resolve, reject) => {
        Promise.all([
            loader.init(),
            import(`monaco-themes/themes/${theme}.json`),
        ])
            .then(([monaco, themeData]) => {
                monaco.editor.defineTheme(theme, themeData);
                resolve(themeData);
            })
            .catch((e) => {
                reject(theme);
            });
    });
};
