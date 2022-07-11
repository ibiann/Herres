import axios from 'axios'
import { API_ROOT } from '../util/const'
export const loginApi= async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/auth/login`, data)
  return response.data
}
export const registerApi= async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/auth/register`, data)
  return response.data
}
export const logoutApi= async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/auth/logout`, data)
  return response.data
}
