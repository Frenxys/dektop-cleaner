// src/index.jsx
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import "../style.css"
function App() {
  const [logs, setLogs] = useState([]);

  const cleanDesktop = async () => {
    const result = await window.electronAPI.cleanDesktop();
    setLogs(result);
  };

  return (
    <div>
      <h1>🧹 Desktop Cleaner</h1>
      <button onClick={cleanDesktop}>Clean Desktop</button>
      <div>
        {logs.map((msg, i) => <p key={i}>{msg}</p>)}
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
