import courseService from '../services/courses'
import userService from '../services/users'

const courseReducer = (store = [], action) => {
    switch (action.type) {
        case 'GET_COURSES':
            return store = action.courses
        case 'CREATE_COURSE':
            return store.concat(action.newCourse)
        case 'JOIN_COURSE':
            const courses = store.filter(course => course.id !== action.course.id)
            courses.concat(action.course)
            return store = courses
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

export const joinCourse = (courseId, loggedUserId) => {
    return async (dispatch) => {
        const course = await courseService.joinCourse(courseId)
        const updatedUser = await userService.getOne(loggedUserId)
        dispatch({
            type: 'JOIN_COURSE',
            course,
            updatedUser
        })
    }
}

export default courseReducer