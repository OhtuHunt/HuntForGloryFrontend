import groupService from '../services/groups'

const groupReducer = (store = [], action) => {
    switch(action.type) {
        case 'GET_GROUPS':
            return store = action.data
        case 'GET_COURSE_GROUPS':
            return store = action.data
        case 'CREATE_GROUPS':
            const oldWithoutThisCourse = store.filter(group => group.course !== action.data[0].course)
            return store = oldWithoutThisCourse.concat(action.data)
        default:
            return store
    }
}

export const createGroups = (courseId, amount) => {
    return async (dispatch) => {
        const groups = await groupService.createGroups(courseId, amount)
        dispatch({
            type: 'CREATE_GROUPS',
            data: groups
        })
    }
}

export const getCourseGroups = (courseId) => {
    return async (dispatch) => {
        const groups = await groupService.getGroups(courseId)
        dispatch({
            type: 'GET_COURSE_GROUPS',
            data: groups
        })
    }
}

export const moveUser = (userId, groupFrom, groupTo) => {
    return async (dispatch) => {
        const groups = await groupService.changeGroup(userId, groupFrom, groupTo)
        dispatch({
            type: 'GET_GROUPS',
            data: groups
        })
    }
}

export const getGroups = () => {
    return async (dispatch) => {
        const groups = await groupService.getAll()
        dispatch({
            type: 'GET_GROUPS',
            data: groups
        })
    }
}

export default groupReducer