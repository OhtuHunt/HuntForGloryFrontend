import validator from 'validator'

const validateProfile = (user) => {
    let errorArray = []

    errorArray = errorArray.concat(validateProfileName(user.username), validateEmail(user.email))

    let errors = []

    errorArray.forEach(error => {
        if (error) {
            errors = errors.concat(error)
        }
    })
    return errors
}

const validateProfileName = (username) => {
    if (validator.isLength(username, {min: 1, max: 15}) && validator.isAlphanumeric(username)) {
        return
    }
    return 'Username must only contain alphanumeric characters and has to be between 1 and 15 characters long'
}

const validateEmail = (email) => {
    if (validator.isEmail(email)) {
        return
    }
    return 'Email must be a valid email adress'
}

export default validateProfile