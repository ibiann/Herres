import axios from 'axios'
import { API_ROOT } from '../util/const'
export const updateCard = async (id, data) => {
  const response = await axios.put(`${API_ROOT}/v1/cards/${id}`, data)
  return response.data
}
export const getComments = async (id) => {
  const response = await axios.get(`${API_ROOT}/v1/cards/${id}/comments`)
  return response.data
}
export const deleteCard = async (id) => {
  const response = await axios.delete(`${API_ROOT}/v1/cards/${id}`)
  return response.data
}