import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import MainBody from './components/MainBody'
import Strategies from './components/Strategies';
import CardDetails from './components/CardDetails';

function App() {
  const [count, setCount] = useState(0)

  return (
      <Routes>
        <Route path="/" element={<><Navbar/> <MainBody /></>} />
        <Route path="/strategies" element={<><Navbar/> <Strategies /></>} />
        <Route path="/card-details" element={<><Navbar/> <CardDetails /></>} />
      </Routes>
  )
}

export default App