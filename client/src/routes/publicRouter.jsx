import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import useApp from '../util/getContext'

function PublicRouter({ children }) {
  const { auth, setAuth } = useApp()
  if (auth) {
    return <Navigate to="/board" />
  }

  return children
}


export default PublicRouter
