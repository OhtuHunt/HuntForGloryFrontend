import axios from 'axios'

let baseUrl = 'https://huntforglory.herokuapp.com/api/quests'
let token

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const config = () => {
  return {
      headers: { 'Authorization': token }
  }
}
const getAll = () => {
  return axios.get(baseUrl)
}

const getOne = (id) => {
  return axios.get(`${baseUrl}/${id}`)
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject, config)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, remove, getOne, update, setToken }
