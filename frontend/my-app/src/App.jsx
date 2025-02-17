import { useState } from 'react'
import { Routes, Route } from "react-router-dom"; // Import only Routes and Route
import Navbar from './components/Navbar'
import MainBody from './components/MainBody'
import Strategies from './components/Strategies';
import CardDetails from './components/CardDetails';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainBody />} />
        <Route path="/strategies" element={<Strategies />} />
        <Route path="/card-details" element={<CardDetails />} />
      </Routes>
    </>
  )
}

export default App;