import Library from '../pages/Library';


export default {
title: 'Pages/Library',
component: Library,
parameters: {
layout: 'fullscreen',
backgrounds: { default: 'dark' },
},
argTypes: {
totalBooks: { control: 'number', defaultValue: 42, description: 'Number of audiobooks in library' },
},
};


export const Default = (args) => <Library {...args} />;
