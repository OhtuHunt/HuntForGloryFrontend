import axios from 'axios'

let baseUrl = process.env.NODE_ENV === 'production' ? 'https://huntforglory.herokuapp.com/api/login' : 'https://hunttest.herokuapp.com/api/login'

const login = (props) => {
    const valuesGiven = {
        username: props.username,
        password: props.password
    }
    return axios.post(`${baseUrl}`, valuesGiven)
}

export default { login }