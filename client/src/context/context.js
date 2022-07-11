import { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { setAuthHttp } from '../util/http'
export const AppContext = createContext()
export default function AppProvider({ children }) {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem('auth')) || null
  )
  setAuthHttp(axios, auth?.token)

  // useEffect(() => {
  //   setAuthHttp(axios, auth?.token)
  // })
  return (
    <AppContext.Provider value={{ auth, setAuth }}>
      {children}
    </AppContext.Provider>
  )
}
