import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import CustomRoutes from './routes'

function App() {

  return (
    <>
      <Navbar />
      <div className='mt-[70px]'>
        <CustomRoutes />
      </div>
    </>
  )
}

export default App
