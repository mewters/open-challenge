import React from 'react';
import { Story, Meta } from '@storybook/react';

import ChallengesList, { ChallengesListProps } from './ChallengesList';

export default {
    title: 'navigation/ChallengesList',
    component: ChallengesList,
    argTypes: {},
} as Meta;

const Template: Story<ChallengesListProps> = ({ ...args }) => (
    <ChallengesList {...args} />
);

export const Default = Template.bind({});
Default.args = {
    path: '',
    selectedDirectory: '/01-js-basics/01-variables',
    challenges: [
        {
            path: '01-js-basics',
            children: [
                {
                    path: '01-variables',
                    challenges: [
                        { id: '1668199255098', title: 'Sum' },
                        { id: '16681992550984', title: 'Multiple' },
                    ],
                },
                {
                    path: '02-variables',
                    challenges: [{ id: '1668199255098', title: 'Sum' }],
                },
            ],
        },
        {
            path: '02-js-basics',
            children: [
                {
                    path: '01-variables',
                    challenges: [{ id: '1668199255098', title: 'Sum' }],
                },
                {
                    path: '02-variables',
                    challenges: [
                        { id: '1668199255098', title: 'Sum' },
                        { id: '16681992550984', title: 'Multiple' },
                    ],
                },
            ],
        },
    ],
};
