const notificationReducer = (state = '', action) => {
    console.log(action)
    switch(action.type) {
        case 'SET':
            return action.data
        case 'REMOVE':
            return ''
        default:
            return state
    }
}

export const notify = (notification, time) => {
    return async (dispatch) => {
      dispatch({
        type: 'SET',
        data: notification
      })
      setTimeout(() => {
        dispatch({
          type: 'REMOVE',
          data: notification
        })
      }, time)
    }
  }

export default notificationReducer