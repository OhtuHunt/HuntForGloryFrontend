import feedbackService from '../services/feedbackService'

const feedbackReducer = (store = [], action) => {
    switch(action.type) {
        case 'SEND_FEEDBACK':
            return store = store.concat(action.data)
        case 'INIT_FEEDBACKS':
            return store = action.data
        case 'MARK_AS_READ':
            const feedbacksFiltered = store.filter(f => f.id !== action.data.id)
            return store = feedbacksFiltered.concat(action.data)
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

export const initializeFeedbacks = () => {
    return async (dispatch) => {
        const feedbacks = await feedbackService.getAll()
        dispatch({
            type: 'INIT_FEEDBACKS',
            data: feedbacks
        })
    }
}

export const markFeedbackRead = (id) => {
    return async (dispatch) => {
        const readFeedback = await feedbackService.markAsRead(id)
        dispatch({
            type: 'MARK_AS_READ',
            data: readFeedback
        })
    }
}

export default feedbackReducer