import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Children, useState } from 'react'
import Home from "./pages/Home";
import About from "./pages/About";
import Index from "./Index";

function App() {
 
  const [childData, setChildData] = useState("");
  const text = "some text message from parent";

  const handleText = (data) => {
    setChildData(data);
  };
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
      <p>Message from Child: {childData}</p>
      <Routes>
        <Route path="/" element={<Home text={text} sendData={handleText} />} />
        <Route path="/about" element={<About />} />
        <Route path="/task-manager" element={<Index fromHome={childData} />} />
      </Routes>
    </Router>

    
    </div>
      
    </>
  )
}

export default App
