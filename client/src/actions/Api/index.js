import axios from 'axios'
import { API_ROOT } from '../../util/const'

export const fetchBoard = async (id) => {
    const request = await axios.get(`${API_ROOT}/v1/boards/${id}`)
    return request.data
}
// tra ve board neu co

export const updateBoard = async (id, data) => {
    const request = await axios.put(`${API_ROOT}/v1/boards/${id}`, data)
    return request.data
}
// tra ve update board neu co

export const createColumn = async (data) => {
    const request = await axios.post(`${API_ROOT}/v1/columns`, data) // data request body ben server se nhan ve
    return request.data
}
// tra ve tao column neu co

// update or remove column
export const updateColumn = async (id, data) => {
    const request = await axios.put(`${API_ROOT}/v1/columns/${id}`, data) // data request body ben server se nhan ve
    return request.data
}
// tra ve update column neu co

export const createCard = async (data) => {
    const request = await axios.post(`${API_ROOT}/v1/cards`, data) // data request body ben server se nhan ve
    return request.data
}
// tra ve tao card neu co

export const updateCard = async (id, data) => {
    const request = await axios.put(`${API_ROOT}/v1/cards/${id}`, data) // data request body ben server se nhan ve
    return request.data
}
// tra ve update card neu co