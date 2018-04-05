const doneFilterReducer = (store = false, action) => {
    switch (action.type) {
        case 'CHANGE_DONE':
            return store = !store
        default:
            return store
    }
}

export const changeDone = () => {
    return async (dispatch) => {
        dispatch({
        type: 'CHANGE_DONE'
        })
    }
}

export default doneFilterReducer