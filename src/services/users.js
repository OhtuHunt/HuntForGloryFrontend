import axios from 'axios'

let baseUrl = 'https://huntforglory.herokuapp.com/api/users'

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
    const response = await axios.get(baseUrl)
    return response.data
}

const update = async (updatedUser, id) => {
    const response = await axios.put(`${baseUrl}/${id}`, updatedUser, config())
    return response.data
}

const remove = async (id) => {
    // const response = await axios.delete(`${baseUrl}/${id}`, config())
    // return response
}

export default { getAll, remove, update, setToken}