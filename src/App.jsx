import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'
import { ToastProvider } from './Components/ToastContext/ToastContext'

const App = () => {
  return (
    <ToastProvider>
      <div>
      <Navbar/>
      <Admin/>
    </div>
    </ToastProvider>
    
  )
}

export default App
