import validator from 'validator'

const validateFeedback = (feedback) => {
    let errorArray = []

    errorArray = errorArray.concat(validateTitle(feedback.title), validateContent(feedback.content))

    let errors = []

    errorArray.forEach(error => {
        if (error) {
            errors = errors.concat(error)
        }
    })
    return errors
}

const validateTitle = (title) => {
    if (validator.isLength(title, {min: 1, max: 15}) && validator.isAlphanumeric(title)) {
        return
    }
    return 'Feedback title must only contain alphanumeric characters and has to be between 1 and 15 characters long'
}

const validateContent = (content) => {
    if (validator.isLength(content, {min: 10, max: 200})) {
        return
    }
    return 'Feedback content must be between 10 and 200 characters long'
}

export default validateFeedback