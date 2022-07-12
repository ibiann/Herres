export const getHttpResponse = (response) => {
  return response.response.data
}

export const setAuthHttp = (axios, token) => {
  console.log(token)
  if (token)
    axios.defaults.headers.common = { Authorization: `Bearer ${token}` }
  return axios
}
