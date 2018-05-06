import axios from 'axios'

let baseUrl = ''
if (process.env.REACT_APP_LOCAL !== 'true') {
    baseUrl = process.env.REACT_APP_BASE_URL+'/api/login'
} else {
    baseUrl = `http://localhost:3001/api/login`
}
const login = (props) => {
    const valuesGiven = {
        username: props.username,
        password: props.password
    }
    return axios.post(`${baseUrl}`, valuesGiven)
}

export default { login }