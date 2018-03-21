import userService from '../services/users'

const loggedUserReducer = (store = null, action) => {
    switch(action.type) {
        case 'SET_USER':
            return store = action.user
        default:
            return store
    }
}

export const setLoggedUser = (user) => {
    return async (dispatch) => {
        dispatch({
            type: 'SET_USER',
            user
        })
    }
}

export default loggedUserReducer