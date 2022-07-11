import axios from 'axios'
import { API_ROOT } from '../util/const'

/* Api calling board from server-test */



export const createColumn = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, data) // data response body ben server se nhan ve
  return response.data
}
// tra ve tao column neu co

// update or remove column
export const updateColumn = async (id, data) => {
  const response = await axios.put(`${API_ROOT}/v1/columns/${id}`, data) // data response body ben server se nhan ve
  return response.data
}
// tra ve update column neu co

export const createCard = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, data) // data response body ben server se nhan ve
  return response.data
}
// tra ve tao card neu co

export const updateCard = async (id, data) => {
  const response = await axios.put(`${API_ROOT}/v1/cards/${id}`, data) // data response body ben server se nhan ve
  return response.data
}
// tra ve update card neu co
