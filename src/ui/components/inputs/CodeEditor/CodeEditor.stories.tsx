import React from 'react';
import { Story, Meta } from '@storybook/react';

import CodeEditor, { CodeEditorProps } from './CodeEditor';

const themesList = [
    'Active4D',
    'All Hallows Eve',
    'Amy',
    'Birds of Paradise',
    'Blackboard',
    'Brilliance Black',
    'Brilliance Dull',
    'Chrome DevTools',
    'Clouds Midnight',
    'Clouds',
    'Cobalt',
    'Cobalt2',
    'Dawn',
    'Dominion Day',
    'Dracula',
    'Dreamweaver',
    'Eiffel',
    'Espresso Libre',
    'GitHub',
    'IDLE',
    'idleFingers',
    'iPlastic',
    'Katzenmilch',
    'krTheme',
    'Kuroir Theme',
    'LAZY',
    'MagicWB (Amiga)',
    'Merbivore Soft',
    'Merbivore',
    'monoindustrial',
    'Monokai Bright',
    'Monokai',
    'Night Owl',
    'Nord',
    'Oceanic Next',
    'Pastels on Dark',
    'Slush and Poppies',
    'Solarized-dark',
    'Solarized-light',
    'SpaceCadet',
    'Sunburst',
    'Textmate (Mac Classic)',
    'themelist',
    'Tomorrow-Night-Blue',
    'Tomorrow-Night-Bright',
    'Tomorrow-Night-Eighties',
    'Tomorrow-Night',
    'Tomorrow',
    'Twilight',
    'Upstream Sunburst',
    'Vibrant Ink',
    'Xcode_default',
    'Zenburnesque',
];

export default {
    title: 'inputs/CodeEditor',
    component: CodeEditor,
    argTypes: {
        theme: {
            control: {
                type: 'select',
            },
            options: ['vs-dark', 'vs-light', ...themesList],
        },
    },
} as Meta;

const Template: Story<CodeEditorProps> = ({ ...args }) => (
    <CodeEditor {...args} />
);

export const Default = Template.bind({});
Default.args = {
    initialLineNumber: 1,
    readOnly: false,
    theme: 'Dracula',
    language: 'javascript',
    value: `// some code\n
const someVariable = "Abc";
const boolean = true;

function sum(a, b) {
    return a + b;
}

console.log(sum(1, 5))\n`,
};
