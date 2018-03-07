import axios from 'axios'

let baseUrl = 'https://huntforglory.herokuapp.com/api/users'


const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const remove = async (id) => {
    // const response = await axios.delete(`${baseUrl}/${id}`, config())
    // return response
}

export default { getAll, remove }