import axios from 'axios'
import { API_ROOT } from '../util/const'
export const fetchBoard = async (id) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${id}`)
  return response.data
}
export const getUsersInvited = async (id) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/invited_users/${id}`)
  return response.data
}
export const getCanUsersInvited = async (id) => {
  const response = await axios.get(
    `${API_ROOT}/v1/boards/can_invited_users/${id}`
  )
  return response.data
}
// tra ve board neu co
export const createBoard = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/boards`, data)
  return response.data
}
// tra ve board neu co

export const updateBoard = async (id, data) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/${id}`, data)
  return response.data
}
// tra ve update board neu co
export const getBoards = async () => {
  console.log(axios.defaults.headers.common)
  const response = await axios.get(`${API_ROOT}/v1/boards`)
  return response.data
}
export const getBoardsRecent = async (num) => {
  console.log(axios.defaults.headers.common)
  const response = await axios.get(`${API_ROOT}/v1/boards`, {
    params: { recent: num },
  })
  return response.data
}
export const invitedUsers = async (boardId, data) => {
  const response = await axios.post(
    `${API_ROOT}/v1/boards/invited_users/${boardId}`,
    { invitedUsers: data }
  )
  return response.data
}
