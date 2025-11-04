import Downloads from '../pages/Downloads';


export default {
title: 'Pages/Downloads',
component: Downloads,
parameters: {
layout: 'fullscreen',
backgrounds: { default: 'dark' },
},
argTypes: {
activeDownloads: { control: 'number', defaultValue: 2 },
completedDownloads: { control: 'number', defaultValue: 10 },
},
};


export const Default = (args) => <Downloads {...args} />;
