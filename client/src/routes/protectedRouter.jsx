import React from 'react'
import PropTypes from 'prop-types'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import useApp from '../util/getContext'

function PrivateRouter({ children }) {
  const { auth, setAuth } = useApp()
  if (!auth) {
    return <Navigate to="/" />
  }

  return children
}

export default PrivateRouter
