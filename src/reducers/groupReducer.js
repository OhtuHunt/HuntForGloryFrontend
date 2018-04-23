import groupService from '../services/groups'

const groupReducer = (store = [], action) => {
    switch(action.type) {
        case 'GET_GROUPS':
            return store = action.data
        case 'INIT_GROUPS':
            return store = action.data
        default:
            return store
    }
}

export const initializeGroups = (courseId) => {
    return async (dispatch) => {
        const groups = await groupService.createGroups(courseId)
        dispatch({
            type: 'INIT_GROUPS',
            data: groups
        })
    }
}

export const getGroups = (courseId) => {
    return async (dispatch) => {
        const groups = await groupService.getGroups(courseId)
        dispatch({
            type: 'GET_GROUPS',
            data: groups
        })
    }
}

export default groupReducer