const doneFilterReducer = (store = false, action) => {
    switch (action.type) {
        case 'CHANGE_DONE':
            return store = !store
        default:
            return store
    }
}

export const changeDone = () => {
    return {
        type: 'CHANGE_DONE',
    }
}

export default doneFilterReducer