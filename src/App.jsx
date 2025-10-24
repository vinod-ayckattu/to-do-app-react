import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Index from "./Index";

function App() {
 
  
  return (
    <>
    <div>
      <Router>
      <nav style={{ margin: 10 }}>
        <Link to="/" style={{ margin: 5 }}>Home</Link>
        <Link to="/about" style={{ margin: 5 }}>About</Link>
        <Link to="/task-manager" style={{ margin: 5 }}>Task Manager</Link>
      </nav>

      <div style={{backgroundColor: 'blue', color: 'white' }}>
        Test Content!
      </div>
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/task-manager" element={<Index />} />
      </Routes>
    </Router>

    
    </div>
      
    </>
  )
}

export default App
