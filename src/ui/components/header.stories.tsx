import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import Header from './header';
import {MemoryRouter} from "react-router-dom";

export default {
    title: 'Header',
    component: Header,
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'fullscreen',
    },
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (args) => <MemoryRouter><Header {...args} /></MemoryRouter>;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
    user: {
        id: 1,
        first_name: 'Galizhan',
        last_name: 'Tolybayev',
        email: 'galix.kz@gmail.com',
        avatar: ''
    },
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
