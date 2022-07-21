import { createContext, useState, useContext, useEffect, useMemo } from 'react'
import axios from 'axios'
import { setAuthHttp } from '../util/http'
import { getCurrentUser } from '../api/auth'
export const AppContext = createContext()
export default function AppProvider({ children }) {
  const [boards, setBoards] = useState([])
  const [invitedUsers, setInvitedUsers] = useState([])
  const [spinLoading, setSpinLoading] = useState(false)
  const [board, setBoard] = useState(null)
  // const recentBoards = useMemo(() => {
  //   const s = boards.sort((a, b) => b.createdAt - a.createdAt).slice(0, 3)
  //   return s
  // }, [boards])
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  )
  setAuthHttp(axios, JSON.parse(localStorage.getItem('token')))

  // useEffect(() => {
  //   setAuthHttp(axios, auth?.token)
  // })
  useEffect(() => {
    const getCurrentUserApi = async () => {
      const data = await getCurrentUser()
      setAuth(data.user)
      localStorage.setItem('user', JSON.stringify(data.user))
    }
    getCurrentUserApi()
  }, [])
  return (
    <AppContext.Provider
      value={{
        auth,
        setAuth,
        boards,
        setBoards,
        spinLoading,
        setSpinLoading,
        invitedUsers,
        setInvitedUsers,
        board,
        setBoard,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
