import React from 'react';

export default {
  title: 'Spokenarr/Home',
  parameters: { layout: 'fullscreen' }
};

export const Home = () => (
  <div style={{padding: 40, background: 'linear-gradient(90deg,#ff7a00,#ff9d3b)', minHeight: '100vh'}}>
    <h1 style={{fontSize: 36, color: 'white', fontWeight: 'bold'}}>Spokenarr</h1>
    <p style={{fontSize: 18, color: 'white'}}>Automated Audiobook Management</p>
  </div>
);
