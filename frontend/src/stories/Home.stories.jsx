import App from '../App';


export default {
title: 'Pages/Home',
component: App,
parameters: {
layout: 'fullscreen',
backgrounds: { default: 'dark' },
},
argTypes: {
title: { control: 'text', defaultValue: 'Welcome to Spokenarr' },
description: { control: 'text', defaultValue: 'Manage, download, and organize your audiobook collection seamlessly.' },
},
};


export const Default = (args) => <App {...args} />;
