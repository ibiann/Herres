import React, { useEffect } from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { getCurrentUser } from '../api/auth'
import useApp from '../util/getContext'

function PublicRouter({ children }) {
  const { auth, setAuth } = useApp()
  if (auth) {
    return <Navigate to="/boards" />
  }

  return children
}

export default PublicRouter
