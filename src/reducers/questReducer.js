import questService from '../services/quests'
import userService from '../services/users'

const questReducer = (store = [], action) => {
    switch (action.type) {
        case 'INIT_QUESTS':
            return store = action.quests
        case 'CREATE_QUEST':
            return store.concat(action.newQuest)
        case 'REMOVE_QUEST':
            return store.filter(q => q.id !== action.id)
        case 'DEACTIVATE_QUEST':
            return store.map(q => q.id === action.quest.id ? action.quest : q)
        case 'EDIT_QUEST':
            return store.map(q => q.id === action.editedQuest.id ? action.editedQuest : q)
        case 'SET_QUESTS':
            return store = action.quests
        case 'START_QUEST':
            const oldWithoutStarted = store.filter(q => q.id !== action.startedQuest.id)
            return store = oldWithoutStarted.concat(action.startedQuest)
        case 'FINISH_QUEST':
            const oldWithoutFinished = store.filter(q => q.id !== action.finishedQuest.id)
            return store = oldWithoutFinished.concat(action.finishedQuest)
        case 'GET_COURSE_QUESTS':
            const courseQuests = action.quests.filter(quest => quest.course.id === action.courseId)
            return store = store.concat(courseQuests)
        default:
            return store
    }
}

export const initializeQuests = () => {
    return async (dispatch) => {
        const quests = await questService.getAll()
        dispatch({
            type: 'INIT_QUESTS',
            quests
        })
    }
}

export const getCourseQuests = (courseId) => {
    return async (dispatch) => {
        const quests = await questService.getAll()
        dispatch({
            type: 'GET_COURSE_QUESTS',
            quests,
            courseId
        })
    }
}

export const createQuest = (quest) => {
    return async (dispatch) => {
        const newQuest = await questService.create(quest)
        dispatch({
            type: 'CREATE_QUEST',
            newQuest
        })
    }
}

export const removeQuest = (id) => {
    return async (dispatch) => {
        await questService.remove(id)
        dispatch({
            type: 'REMOVE_QUEST',
            id
        })
    }
}

export const deactivateQuest = (id) => {
    return async (dispatch) => {
        const quest = await questService.deactivateQuest(id)
        dispatch({
            type: 'DEACTIVATE_QUEST',
            quest
        })
    }
}

export const editQuest = (quest, id) => {
    return async (dispatch) => {
        const editedQuest = await questService.update(id, quest)
        dispatch({
            type: 'EDIT_QUEST',
            editedQuest
        })
    }
}

export const setQuests = (quests) => {
    return async (dispatch) => {
        dispatch({
            type: 'SET_QUESTS',
            quests
        })
    }
}

export const startQuest = (loggedUserId, id) => {
    return async (dispatch) => {
        const startedQuest = await questService.startQuest(id)
        const updatedUser = await userService.getOne(loggedUserId)
        dispatch({
            type: 'START_QUEST',
            startedQuest: { ...startedQuest, started: true },
            updatedUser
        })
    }
}

export const finishQuest = (loggedUserId, id, activationCode) => {
    return async (dispatch) => {
        const finishedQuest = await questService.finishQuest(id, activationCode)
        const updatedUser = await userService.getOne(loggedUserId)
        dispatch({
            type: 'FINISH_QUEST',
            finishedQuest: { ...finishedQuest, finished: true },
            updatedUser
        })
    }
}

export default questReducer