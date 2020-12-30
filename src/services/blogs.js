import axios from 'axios'
const baseUrl = 'http://localhost:3005'

const getAll = () => {
  const request = axios.get(`${baseUrl}/api/blogs`)
  return request.then(response => response.data)
}

const postBlog = (obj, token) => {
  const config = {
    headers: {Authorization: `bearer ${token}`}
  }
  const request = axios.post(`${baseUrl}/api/blogs`, obj, config)
  return request.then(res => res.data)
  
}

const likeBlog = (obj , id, token) => {
  const config = {
    headers: {Authorization: `bearer ${token}`}
  }
  return axios
    .put(`${baseUrl}/api/blogs/${id}`, obj, config)
    .then(res => res.data )
}

const deleteBlog = (token, id) =>  {
  const config = {
    headers: {Authorization: `bearer ${token}`}
  }
  return axios
    .delete(`${baseUrl}/api/blogs/${id}`, config)
}

const getToken = async ({username, password}) => {
  return axios
    .post(`${baseUrl}/login`, {username, password})
    .then(res => res.data)
}

export default { getAll, getToken, postBlog, likeBlog, deleteBlog }