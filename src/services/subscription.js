import axios from 'axios'

let baseUrl = ''
if (process.env.REACT_APP_LOCAL !== 'true') {
    baseUrl = process.env.REACT_APP_BASE_URL
} else {
    baseUrl = `http://localhost:3001/api/subs`
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

const sendSubscription = async (subscription) => {
    const response = await axios.post(`${baseUrl}/save`, subscription, config())
    return response
}

const sendPushNotification = async (notification) => {
    const response = await axios.post(`${baseUrl}/send-push`, notification, config())
    return response
}

export default { setToken, sendSubscription, sendPushNotification }