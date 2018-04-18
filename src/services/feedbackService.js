import axios from 'axios'

let baseUrl = ''
if (process.env.REACT_APP_LOCAL !== 'true') {
    baseUrl = process.env.REACT_APP_ENV !== 'development' ? `https://huntforglory.herokuapp.com/api/feedbacks` : `https://hunttest.herokuapp.com/api/feedbacks`
} else {
    baseUrl = `http://localhost:3001/api/feedbacks`
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

const sendFeedback = async (feedback) => {
    const response = await axios.post(baseUrl, feedback, config())
    return response.data
}

const getAll = async () => {
    const response = await axios.get(baseUrl, config())
    return response.data
}

const markAsRead = async (id) => {
    const response = await axios.post(`${baseUrl}/${id}/read`,null, config())
    return response.data
}

export default { sendFeedback, setToken, getAll, markAsRead }