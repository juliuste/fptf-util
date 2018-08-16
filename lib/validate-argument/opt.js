'use strict'

const validateFptf = require('validate-fptf')()
const isObject = require('lodash/isobject')
const isUndefined = require('lodash/isundefined')
const isNumber = require('lodash/isnumber')

const validateOpt = o => {
    const message = 'opt must be an object or undefined'
    if (!isObject(o) && !isUndefined(o)) error(message)
    return true
}

const validateStationsOpt = o => {
    validateOpt(o)
    return true
}

const validateStationsSearchOpt = o => {
    validateOpt(o)
    return true
}

const validateStationsNearbyOpt = o => {
    validateOpt(o)
    if (isObject(o)) {
        validateOptDistance(o.distance)
    }
    return true
}

const validateOptDistance = d => {
    if (d) {
        const message = `opt.distance must be a non-negative number or null/undefined`
        if (!isNumber(d)) error(message)
        if (d < 0) error(message)
    }
    return true
}

const validateArgument = ({
    opt: validateOpt,
    stationsOpt: validateStationsOpt,
    stopsOpt: validateStationsOpt,
    regionsOpt: validateStationsOpt,
    stationsSearchOpt: validateStationsSearchOpt,
    stopsSearchOpt: validateStationsSearchOpt,
    regionsSearchOpt: validateStationsSearchOpt,
    stationsNearbyOpt: validateStationsNearbyOpt,
    stopsNearbyOpt: validateStationsNearbyOpt,
    regionsNearbyOpt: validateStationsNearbyOpt,
    optDistance: validateOptDistance
})

module.exports = validateArgument
