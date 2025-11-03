import React from 'react';
export const ExampleButton = ({label,onClick}) => (
  <button onClick={onClick} style={{background:'linear-gradient(90deg,#ff7a00,#ff9d3b)',border:'none',color:'#fff',padding:'8px 12px',borderRadius:6}}>{label}</button>
);
