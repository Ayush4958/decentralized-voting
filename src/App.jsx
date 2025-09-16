import { useState } from 'react'
import './App.css'
import CodeHoverCards from './components/lightswindui/lightswind/code-hover-cards';
// import { Github, Code, Dices } from 'lucide-react';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
     <h1 className='text-amber-300 text-5xl' >This is the Page</h1>
      <CodeHoverCards/>
      
    </>
  )
}

export default App
