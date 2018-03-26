import courseService from '../services/courses'

const courseReducer = (store = [], action) => {
    switch (action.type) {
        case 'GET_COURSES':
            return store = action.courses
        case 'CREATE_COURSE':
            return store.concat(action.newCourse)
        default:
            return store
    }
}

export const getCourses = () => {
    return async (dispatch) => {
        let courses = await courseService.getAll()
        dispatch({
            type: 'GET_COURSES',
            courses
        })
    }
}

export const createCourse = (course) => {
    return async (dispatch) => {
        const newCourse = await courseService.create(course)
        dispatch({
            type: 'CREATE_COURSE',
            newCourse
        })
    }
}

export default courseReducer