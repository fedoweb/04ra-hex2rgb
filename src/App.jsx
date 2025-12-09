import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import HexToRgb from './components/HexToRgb'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HexToRgb />
    </>
  )
}

export default App
