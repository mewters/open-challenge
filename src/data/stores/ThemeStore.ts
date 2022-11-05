import { createStore } from '@udecode/zustood';
import { loader } from '@monaco-editor/react';

export const ThemeStore = createStore('Theme')({
    mode: 'dark' as 'light' | 'dark',
    editorTheme: 'vs-dark' as string,
}).extendActions((set, get, api) => ({
    toggleTheme() {
        const nextTheme = get.mode() === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', nextTheme);
        set.mode(nextTheme);
    },
}));
