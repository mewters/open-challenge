import React from 'react';
import { Story, Meta } from '@storybook/react';

import TestsResults, { TestsResultsProps } from './TestsResults';
import { TestsService } from '@services/Tests/TestsService';

export default {
    title: 'data-display/TestsResults',
    component: TestsResults,
    argTypes: {},
} as Meta;

const Template: Story<TestsResultsProps> = ({ ...args }) => (
    <TestsResults {...args} />
);

export const Default = Template.bind({});
const test = new TestsService();
test.describe('sum', () => {
    test.it('sum(2, 3) should return 5', () => {
        test.expect(5).toBe(5);
    });
    test.it('sum(3, 3) should return 6', () => {
        test.expect('3asdf').toContain('a');
        test.expect('3asdf').toContain('b');
    });
});
test.describe('another describe', () => {
    test.it('sum(2, 3) should return 5', () => {
        test.expect(5).toBe(5);
    });
    test.it('sum(3, 3) should return 6', () => {
        test.expect('3asdf').toContain('a');
    });
});

Default.args = {
    ...test.getResults(),
};
