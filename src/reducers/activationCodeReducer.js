const activationCodeReducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_CODE':
            return action.data
        case 'CLEAR_CODE':
            return ''
        default:
            return state
    }
}

export const setActivationCode = (activationCode) => {
    return async (dispatch) => {
      dispatch({
        type: 'SET_CODE',
        data: activationCode
      })
    }
  }

  export const clearActivationCode = () => {
    return async (dispatch) => {
        dispatch({
          type: 'CLEAR_CODE'
        })
      }
  }

export default activationCodeReducer