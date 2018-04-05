const fieldToFilterReducer = (store = '', action) => {
    switch (action.type) {
        case 'CHANGE_FIELD':
            return store = action.field.toLowerCase()
        default:
            return store
    }
}

export const changeFieldToFilter = (field) => {
    return async (dispatch) => {
        dispatch({
        type: 'CHANGE_FIELD',
        field
        })
    }
}

export default fieldToFilterReducer