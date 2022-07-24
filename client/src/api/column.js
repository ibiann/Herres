import axios from 'axios'
import { API_ROOT } from '../util/const'
export const deleteColumn = async (id) => {
  const response = await axios.delete(`${API_ROOT}/v1/columns/${id}`)
  return response.data
}
