'use strict'

const validateFptf = require('validate-fptf')()
const isObject = require('lodash/isobject')
const isUndefined = require('lodash/isundefined')

const validateOpt = o => {
    const message = 'opt must be an object or undefined'
    if (!isObject(o) && !isUndefined(o)) error(message)
    return true
}

const validateStationsOpt = o => {
    validateOpt(o)
    return true
}

const validateArguments = ({
    opt: validateOpt,
    stationsOpt: validateStationsOpt,
    stopsOpt: validateStationsOpt,
    regionsOpt: validateStationsOpt
})

module.exports = validateArguments
