import { createContext, useState, useContext, useEffect, useMemo } from 'react'
import axios from 'axios'
import { setAuthHttp } from '../util/http'
export const AppContext = createContext()
export default function AppProvider({ children }) {
  const [boards, setBoards] = useState([])
  // const recentBoards = useMemo(() => {
  //   const s = boards.sort((a, b) => b.createdAt - a.createdAt).slice(0, 3)
  //   return s
  // }, [boards])
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem('auth')) || null
  )
  setAuthHttp(axios, auth?.token)

  // useEffect(() => {
  //   setAuthHttp(axios, auth?.token)
  // })
  return (
    <AppContext.Provider value={{ auth, setAuth, boards, setBoards }}>
      {children}
    </AppContext.Provider>
  )
}
