import React from 'react';
export default function Navbar(){ return (
  <div className='header'>
    <div style={{display:'flex',alignItems:'center',gap:10}}>
      <div style={{width:36,height:36,borderRadius:18,background:'rgba(255,255,255,0.12)',display:'flex',alignItems:'center',justifyContent:'center'}}>S</div>
      <strong>Spokenarr</strong>
    </div>
    <div><button style={{background:'transparent',border:'none',color:'#fff'}}>Library</button></div>
  </div>
)}