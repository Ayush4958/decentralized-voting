import { useState } from 'react'
import './App.css'
import CodeHoverCards from './components/lightswind/code-hover-cards';
// import { Github, Code, Dices } from 'lucide-react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <h1 className='text-amber-300 text-5xl' >This is the Page</h1>
      {/* <CodeHoverCards/> */}
      <Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
    <CardAction>Card Action</CardAction>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
    </>
  )
}

export default App
