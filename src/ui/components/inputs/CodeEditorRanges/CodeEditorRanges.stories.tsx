import React from 'react';
import { Story, Meta } from '@storybook/react';

import CodeEditorRanges, { CodeEditorRangesProps } from './CodeEditorRanges';

export default {
    title: 'inputs/CodeEditorRanges',
    component: CodeEditorRanges,
    argTypes: {},
} as Meta;

const Template: Story<CodeEditorRangesProps> = ({ ...args }) => (
    <CodeEditorRanges {...args} />
);

export const Default = Template.bind({});
Default.args = {
    initialLineNumber: 1,
    theme: 'Dracula',
    language: 'javascript',
    value: `// some code\n
const someVariable = "Abc";
[---hidden---
const boolean = true;
---hidden---]
[---editable---
function sum(a, b) {
    return a + b;
}
---editable---]

console.log(sum(1, 5))\n`,
};
