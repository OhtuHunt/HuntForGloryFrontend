import axios from 'axios'

let baseUrl = 'https://huntforglory.herokuapp.com/api/users'


const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export default { getAll }