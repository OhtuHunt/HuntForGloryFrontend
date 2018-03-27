const filterReducer = (store = '', action) => {
    switch (action.type) {
        case 'CHANGE_FILTER':
            return store = action.filter.toLowerCase()
        default:
            return store
    }
}

export const changeFilter = (filter) => {
    return {
        type: 'CHANGE_FILTER',
        filter
    }
}

export default filterReducer