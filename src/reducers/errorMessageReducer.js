const errorMessageReducer = (store = [], action) => {
    switch(action.type) {
        case 'SET_ERRORS':
            return action.data
        case 'REMOVE_ERRORS':
            return []
        default:
            return store
    }
}

export const showErrors = (errors, time) => {
    return async (dispatch) => {
      dispatch({
        type: 'SET_ERRORS',
        data: errors
      })
      setTimeout(() => {
        dispatch({
          type: 'REMOVE_ERRORS'
        })
      }, time)
    }
  }

export default errorMessageReducer