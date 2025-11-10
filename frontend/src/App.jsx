import React from 'react'

export default function App() {
  const [health, setHealth] = React.useState(null)

  async function ping() {
    const res = await fetch('/api/health')
    setHealth(await res.json())
  }

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      <h1>Spokenarr</h1>
      <p>Frontend is up. Try hitting the API health endpoint:</p>
      <button onClick={ping}>Ping /api/health</button>
      {health && (
        <pre style={{ background: '#f6f6f6', padding: 12, marginTop: 12 }}>
{JSON.stringify(health, null, 2)}
        </pre>
      )}
    </div>
  )
}
