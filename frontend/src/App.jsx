import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TextLab from './screens/TestLab'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={true}
            closeOnClick
            draggable
        />
      <TextLab />
    </>
  )
}

export default App
