import { useState } from 'react'
import './App.css'
import axios from "axios"
// const axios = require("axios")
function App() {
   const handleLogin = () => {
    const  res = axios.get("http://localhost:3000/user/auth/linkedin" , 
      // Headers  {
        
      // }
    )
   }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <button
        style={{
          backgroundColor: '#0077b5',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '4px',
          fontSize: '18px',
          cursor: 'pointer'
        }}
        onClick={handleLogin}>
      
        Login with LinkedIn
      </button>
    </div>
  );
}

export default App;
