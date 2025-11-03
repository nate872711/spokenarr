import React from 'react';
export default function Navbar(){ return (
  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:12,background:'linear-gradient(90deg,#ff7a00,#ff9d3b)'}}>
    <div style={{display:'flex',alignItems:'center',gap:10}}><div style={{width:36,height:36,borderRadius:18,background:'rgba(255,255,255,0.12)',display:'flex',alignItems:'center',justifyContent:'center'}}>S</div><strong>Spokenarr</strong></div>
    <div><button style={{background:'transparent',border:'none',color:'#fff'}}>Library</button></div>
  </div>
) }
