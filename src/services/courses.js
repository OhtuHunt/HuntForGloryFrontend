import axios from 'axios'

let baseUrl = ''
if (process.env.REACT_APP_LOCAL !== 'true') {
  baseUrl = process.env.REACT_APP_ENV !== 'development' ? `https://huntforglory.herokuapp.com/api/courses` : `https://hunttest.herokuapp.com/api/courses`
} else {
  baseUrl = `http://localhost:3001/api/courses`
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

const joinCourse = async (courseId) => {
  const response = await axios.post(`${baseUrl}/${courseId}/join`, null, config())
  return response
}

export default { getAll, create, remove, getOne, update, setToken, joinCourse }
