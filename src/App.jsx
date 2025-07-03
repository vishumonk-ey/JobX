import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Input from './components/Input'
import Signup from './components/Signup'
import { Login } from './components'
import Header from './components/header/Header'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-full ">
      {/* <Login/> */}
      <Header></Header>
    </div>
  )
}

export default App
