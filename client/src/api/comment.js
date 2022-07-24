import axios from 'axios'
import { API_ROOT } from '../util/const'
export const createComment = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/comments`, data)
  return response.data
}
