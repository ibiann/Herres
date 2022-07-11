import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { routes } from './routes'

const AppRouter = () => {
  return (
    <Routes>
      {routes.map((r, index) => (
        <Route key={index} element={r.element} path={r.path} />
      ))}
    </Routes>
  )
}

export default AppRouter
