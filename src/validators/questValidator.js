import validator from 'validator'

const validateQuest = (quest) => {
    let errorArray = []

    errorArray = errorArray.concat(validatePoints(quest.points), validateName(quest.name))
    if (quest.type === 'location') {
        errorArray = errorArray.concat(validateLocation(quest.activationCode.lat, quest.activationCode.lng, quest.activationCode.radius))
    }

    let errors = []

    errorArray.forEach(error => {
        if (error) {
            errors = errors.concat(error)
        }
    })
    return errors
}

const validatePoints = (points) => {
    if (validator.isEmpty(points.toString()) || !validator.isInt(points.toString())) {
        return 'Quest points must be an integer'
    }
    return
}

const validateName = (name) => {
    if (validator.isLength(name, {min: 1, max: 20})) {
        return
    }
    return 'Quest name must be between 1 and 20 characters long'
}

const validateLocation = (lat, lng, radius) => {
    if (validator.isNumeric(lat.toString()) && validator.isNumeric(lng.toString()) && validator.isNumeric(radius.toString())) {
        return
    }
    return 'Quest latitude, longitude and radius must contain a numeric value'
}

export default validateQuest