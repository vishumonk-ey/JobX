import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Input from './components/Input'
import Signup from './components/Signup'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-full ">
      <Signup/>
    </div>
  )
}

export default App
