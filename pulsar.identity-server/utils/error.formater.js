/**
 * 
 * @param {Result<ValidationError>} params 
 */
function getErrors(errors) {
    return errors.array().map(err => err.msg)
}

module.exports = {
    getErrors: getErrors
}