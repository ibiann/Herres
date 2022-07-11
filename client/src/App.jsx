import React from 'react'
import './App.scss'
import AppRouter from './routes/router'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div>
      <AppRouter />
      <Outlet />
    </div>
  )
}

export default App
