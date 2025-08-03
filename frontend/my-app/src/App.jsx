import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import ToolsNavbar from './components/ToolsNavbar';
import MainBody from './components/MainBody'
import Strategies from './components/Strategies';
import CardDetails from './components/CardDetails';
import News from './components/News'

function App() {
  const [count, setCount] = useState(0)

  return (
      <Routes>
        <Route path="/" element={<><Navbar/> <MainBody /></>} />
        <Route path="/strategies" element={<><ToolsNavbar/> <Strategies /></>} />
        <Route path="/card-details" element={<><ToolsNavbar/> <CardDetails /></>} />
        <Route path="/news" element={<><ToolsNavbar/> <News /></>} />
      </Routes>
  )
}

export default App