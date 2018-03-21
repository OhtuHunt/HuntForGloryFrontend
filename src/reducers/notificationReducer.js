const notificationReducer = (store = '', action) => {
    switch(action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        case 'REMOVE_NOTIFICATION':
            return ''
        default:
            return store
    }
}

export const notify = (notification, time) => {
    return async (dispatch) => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: notification
      })
      setTimeout(() => {
        dispatch({
          type: 'REMOVE_NOTIFICATION',
          data: notification
        })
      }, time)
    }
  }

export default notificationReducer