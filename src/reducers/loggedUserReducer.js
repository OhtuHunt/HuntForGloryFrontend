import userService from '../services/users'

const loggedUserReducer = (store = null, action) => {
    switch(action.type) {
        case 'SET_USER':
            return store = action.user
        case 'UPDATE_POINTS':
            return store = {...store, points: action.updatedUser.points}
        case 'JOIN_COURSE':
            return store = {...store, courses: action.updatedUser.courses}
        case 'START_QUEST':
            return store = action.updatedUser
        case 'FINISH_QUEST':
            return store = action.updatedUser
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

export const updateUserPoints = (id) => {
    return async (dispatch) => {
        const updatedUser = await userService.getOne(id)
        dispatch({
            type: 'UPDATE_POINTS',
            updatedUser
        })
    }
}

export default loggedUserReducer