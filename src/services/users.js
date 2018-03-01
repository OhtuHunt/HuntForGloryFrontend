import axios from 'axios'

let baseUrl = process.env.NODE_ENV === 'production' ? 'https://huntforglory.herokuapp.com/api/users' : 'https://hunttest.herokuapp.com/api/users'


const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export default { getAll }