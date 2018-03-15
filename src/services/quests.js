import axios from 'axios'

let baseUrl = ''
if (process.env.REACT_APP_LOCAL !== 'true') {
  baseUrl = process.env.REACT_APP_ENV !== 'development' ? `${process.env.REACT_APP_BASE_URL}/api/quests` : `${process.env.REACT_APP_DEV_URL}/api/quests`
} else {
  baseUrl = `http://localhost:3001/api/quests`
}
let token

const setToken = (props) => {
  token = `bearer ${props.token}`
}

const config = () => {
  return {
      headers: { 'Authorization': token }
  }
}
const getAll = async () => {
  const response = await axios.get(baseUrl, config())
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`, config())
  return response.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, config())
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config())
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config())
  return response
}

const startQuest = async (id) => {
  const body = {}
  const response = await axios.post(`${baseUrl}/${id}/start`, body, config())
  return response.data
}

const finishQuest = async (id, code) => {
  const body = {
    activationCode: code
  }
  const response = await axios.post(`${baseUrl}/${id}/finish`, body, config())
  return response.data
}

const deactivateQuest = async (id) => {
  const body = {}
  const response = await axios.post(`${baseUrl}/${id}/deactivated`, body, config())
  return response.data
}

export default { getAll, create, remove, getOne, update, setToken, startQuest, finishQuest, deactivateQuest }
