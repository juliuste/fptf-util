'use strict'

const validateFptf = require('validate-fptf')()
const isObject = require('lodash/isobject')
const isUndefined = require('lodash/isundefined')
const isNull = require('lodash/isnull')
const isNumber = require('lodash/isnumber')
const isDate = require('lodash/isdate')

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
    if (!isNull(d) && !isUndefined(d)) {
        const message = `opt.distance must be a non-negative number or null/undefined`
        if (!isNumber(d)) error(message)
        if (d < 0) error(message)
    }
    return true
}

const validateOptWhen = w => {
    if (!isNull(w) && !isUndefined(w)) {
        const message = `opt.when must be a date object`
        if (!w) error(message)
        if (!isDate(w)) error(message)
    }
    return true
}

const validateOptResults = r => {
    if (!isNull(r) && !isUndefined(r)) {
        const message = `opt.results must be a positive integer`
        if (!r) error(message)
        if (!Number.isInteger(r)) error(message)
        if (r <= 0) error(message)
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
    optDistance: validateOptDistance,
    optWhen: validateOptWhen,
    optResults: validateOptResults
})

module.exports = validateArgument
