import validator from 'validator'

const courseValidator = (course) => {
    let errorArray = []

    errorArray = errorArray.concat(validateCourseCode(course.courseCode), validateName(course.name))

    let errors = []

    errorArray.forEach(error => {
        if (error) {
            errors = errors.concat(error)
        }
    })
    return errors
}

const validateCourseCode = (code) => {
    if (validator.isLength(code, {min: 2, max: 20}) && validator.isAlphanumeric(code)) {
        return
    }
    return 'Course code must be an alphanumeric value and length must be between 2 and 20 characters'
}

const validateName = (name) => {
    if (!validator.isLength(name, {min: 1, max: 20})) {
        return 'Course name must be between 1 and 20 characters long'
    }
    return
}

export default courseValidator