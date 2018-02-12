import axios from 'axios'
const baseUrl = 'https://huntforglory.herokuapp.com/api/quests'

const getAll = () => {
  return axios.get(baseUrl)
}

const getOne = (id) => {
  return axios.get(`${baseUrl}/${id}`)
}

const create = (newObject) => {
  return axios.post(baseUrl, newObject)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, remove, getOne }
