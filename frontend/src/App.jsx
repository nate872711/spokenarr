import React from 'react';
import logo from './assets/logo.svg';

export default function App(){
  const API = import.meta.env.VITE_API_URL || 'http://localhost:5180';

  return (
    <div className="min-h-screen flex">
      <aside style={{width:260, background:'#0f1113', padding:20}}>
        <img src={logo} alt="Spokenarr" style={{width:140}}/>
        <nav style={{marginTop:20}}>
          {['dashboard','library','discover','downloads','integrations','settings'].map(k=>(
            <div key={k} style={{padding:'10px 8px', color:'#cbd5e1', cursor:'pointer', marginBottom:6, borderRadius:6}}>{k}</div>
          ))}
        </nav>
      </aside>
      <main style={{flex:1}}>
        <header style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:16, background:'#0c0c0d'}}>
          <div style={{fontSize:20, fontWeight:700}}>Spokenarr</div>
          <div><button className='btn-primary'>Settings</button></div>
        </header>
        <section style={{padding:24}}>
          <h1 style={{fontSize:24}}>Welcome to Spokenarr</h1>
          <p style={{color:'#9aa0a6'}}>Manage audiobooks, automate downloads, and import completed files.</p>
        </section>
      </main>
    </div>
  );
}
