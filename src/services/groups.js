import axios from 'axios'

let baseUrl = ''
if (process.env.REACT_APP_LOCAL !== 'true') {
    baseUrl = process.env.REACT_APP_ENV !== 'development' ? `https://huntforglory.herokuapp.com/api/groups` : `https://hunttest.herokuapp.com/api/groups`
} else {
    baseUrl = `http://localhost:3001/api/groups`
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

const getCourseGroups = async (courseId) => {
    const response = await axios.get(`${baseUrl}/course/${courseId}`, config())
    return response.data
}

const createGroups = async (courseId, amount) => {
    const body = {
        groupAmount: amount
      }
    const response = await axios.post(`${baseUrl}/course/${courseId}/generate`, body, config())
    return response.data
}

export default { setToken, getAll, getGroups, createGroups }