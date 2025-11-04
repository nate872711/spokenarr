import Settings from '../pages/Settings';


export default {
title: 'Pages/Settings',
component: Settings,
parameters: {
layout: 'fullscreen',
backgrounds: { default: 'dark' },
},
argTypes: {
theme: { control: { type: 'select' }, options: ['dark', 'light'], defaultValue: 'dark' },
language: { control: { type: 'select' }, options: ['English', 'Spanish', 'French'], defaultValue: 'English' },
},
};


export const Default = (args) => <Settings {...args} />;
