import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import MainBody from './components/MainBody'
import Strategies from './components/Strategies';
import CardDetails from './components/CardDetails';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Navbar/> <MainBody /></>} />
        <Route path="/strategies" element={<Strategies />} />
        <Route path="/card-details" element={<CardDetails />} />
      </Routes>
    </Router>
  )
}

export default App