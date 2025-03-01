import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Demo } from './components/Demo'
import { Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Navbar } from './components/Navbar'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Demo /> */}
      <Navbar />
      <Routes>
        <Route path= '/' element ={<Home />} />
        <Route path= '/login' element ={<Login />} />
        <Route path= '/register' element ={<Register />} />
      </Routes>
    </>
  )
}

export default App
