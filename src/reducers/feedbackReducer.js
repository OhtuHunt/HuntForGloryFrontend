import feedbackService from '../services/feedbackService'

const feedbackReducer = (store = [], action) => {
    switch(action.type) {
        case 'SEND_FEEDBACK':
            return store = store.concat(action.data)
        default:
            return store
    }
}

export const sendFeedback = (feedback) => {
    return async (dispatch) => {
        const sentFeedback = await feedbackService.sendFeedback(feedback)
        dispatch({
            type: 'SEND_FEEDBACK',
            data: sentFeedback
        })
    }
}

export default feedbackReducer