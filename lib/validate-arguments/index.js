'use strict'

const validateRequired = require('./required')
const validateOpt = require('./opt')

const validateArguments = ({
    ...validateRequired,
    ...validateOpt
})

module.exports = validateArguments
