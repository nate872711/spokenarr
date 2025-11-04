import Discover from '../pages/Discover';


export default {
title: 'Pages/Discover',
component: Discover,
parameters: {
layout: 'fullscreen',
backgrounds: { default: 'dark' },
},
argTypes: {
sourceCount: { control: 'number', defaultValue: 3, description: 'Number of sources displayed' },
},
};


export const Default = (args) => <Discover {...args} />;
