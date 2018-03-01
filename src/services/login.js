import axios from 'axios'

let baseUrl = 'https://huntforglory.herokuapp.com/api/login'

const login = (props) => {
    const valuesGiven = {
        username: props.username,
        password: props.password
    }
    return axios.post(`${baseUrl}`, valuesGiven)
}

export default { login }