'use strict'

const validateRequired = require('./required')
const validateOpt = require('./opt')

const validateArgument = ({
    ...validateRequired,
    ...validateOpt
})

module.exports = validateArgument
