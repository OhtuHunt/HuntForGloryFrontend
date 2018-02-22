import axios from 'axios'

let baseUrl = process.env.NODE_ENV !== 'production' ? 'https://huntforglory.herokuapp.com/api/quests' : 'https://hunttest.herokuapp.com/api/quests'

const getAll = () => {
  return axios.get(baseUrl)
}

const getOne = (id) => {
  return axios.get(`${baseUrl}/${id}`)
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, remove, getOne, update }
