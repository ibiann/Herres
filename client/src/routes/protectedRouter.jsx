import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import useApp from '../util/getContext'
import { getCurrentUser } from '../api/auth'

function PrivateRouter({ children }) {
  const { auth, setAuth } = useApp()
  console.log(auth)
  if (!auth) {
    return <Navigate to="/login" />
  }

  return children
}

export default PrivateRouter
