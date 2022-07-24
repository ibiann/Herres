import axios from 'axios'
import { API_ROOT } from '../util/const'
export const updateUser = async (id, data) => {
  const response = await axios.put(`${API_ROOT}/v1/users/${id}`, data)
  return response.data
}
export const getUsers = async () => {
  const response = await axios.get(`${API_ROOT}/v1/users`)
  return response.data
}
