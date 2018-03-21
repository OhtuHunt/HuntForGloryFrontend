import userService from '../services/users'

const usersReducer = (store = [], action) => {
    switch (action.type) {
        case 'GET_USERS':
            return store = action.users
        case 'EDIT_USER':
            return store.map(u => u.id === action.editedUser.id ? action.editedUser : u)
        case 'REMOVE_USER':
            return store.filter(u => u.id !== action.id)
        default:
            return store
    }
}

export const getUsers = () => {
    return async (dispatch) => {
        let users = await userService.getAll()
        users = users.sort((a, b) => { return b.points - a.points })
        dispatch({
            type: 'GET_USERS',
            users
        })
    }
}

export const editUser = (user) => {
    return async (dispatch) => {
        const editedUser = await userService.update(user, user.id)
        dispatch({
            type: 'EDIT_USER',
            editedUser
        })
    }
}

export const removeUser = (id) => {
    return async (dispatch) => {
        await userService.remove(id)
        dispatch({
            type: 'REMOVE_USER',
            id
        })
    }
}

export default usersReducer