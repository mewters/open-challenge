import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import MainDrawer from './MainDrawer';

export default {
    title: 'navigation/MainDrawer',
    component: MainDrawer,
    argTypes: {},
} as ComponentMeta<typeof MainDrawer>;

const Template: ComponentStory<typeof MainDrawer> = (args) => (
    <MainDrawer {...args} />
);

export const Default = Template.bind({});
Default.args = {};
