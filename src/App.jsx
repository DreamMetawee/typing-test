import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import TypingTest from "./components/typing-test/typing-test"
import SpeedTyping from "./components/typing-test/speedtypingame"
import Home from "./components/app/home"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/typing-test" element={<TypingTest />} />
          <Route path="/speedtypingame" element={<SpeedTyping />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
