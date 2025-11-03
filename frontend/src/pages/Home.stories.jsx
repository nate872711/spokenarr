import React from 'react';
import Navbar from '../components/Navbar';
import { ExampleButton } from '../components/ExampleButton';
export default { title: 'App/Homepage', parameters: { layout:'fullscreen' } };
export const Home = () => (
  <div>
    <Navbar />
    <div className='container'>
      <h1 style={{fontSize:28}}>Spokenarr</h1>
      <p>Automated audiobook manager</p>
      <ExampleButton label='Play sample' onClick={()=>alert('play')}/>
    </div>
  </div>
);
