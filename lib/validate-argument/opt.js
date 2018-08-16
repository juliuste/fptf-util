'use strict'

const validateFptf = require('validate-fptf')()
const isObject = require('lodash/isobject')
const isUndefined = require('lodash/isundefined')
const isNull = require('lodash/isnull')
const isNumber = require('lodash/isnumber')
const isDate = require('lodash/isdate')
const isCurrencyCode = require('is-currency-code')

const validateRequiredArgument = require('./required')

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

const createValidateOptWhen = role => w => {
    if (!isNull(w) && !isUndefined(w)) {
        const message = `opt.${role} must be a date object or null/undefined`
        if (!isDate(w)) error(message)
    }
    return true
}

const validateOptResults = r => {
    if (!isNull(r) && !isUndefined(r)) {
        const message = `opt.results must be a positive integer or null/undefined`
        if (!Number.isInteger(r)) error(message)
        if (r <= 0) error(message)
    }
    return true
}

const validateOptInterval = i => {
    if (!isNull(i) && !isUndefined(i)) {
        const message = `opt.interval must be a non-negative number or null/undefined`
        if (!isNumber(i)) error(message)
        if (i < 0) error(message)
    }
    return true
}

const validateOptTransfers = t => {
    if (!isNull(t) && !isUndefined(t)) {
        const message = `opt.transfers must be a non-negative integer or null/undefined`
        if (!Number.isInteger(t)) error(message)
        if (t < 0) error(message)
    }
    return true
}

const createValidateOptStation = role => s => {
    if (!isNull(s) && !isUndefined(s)) {
        const validateStation = validateRequiredArgument.createValidateStation('opt.'+role)
        validateStation(s)
    }
    return true
}

const validateOptCurrency = c => {
    if (!isNull(c) && !isUndefined(c)) {
        const message = `opt.currency must be an ISO 4217 currency code string or null/undefined`
        if (!isCurrencyCode(c)) error(message)
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
    optWhen: createValidateOptWhen('when'),
    optDepartureAfter: createValidateOptWhen('departureAfter'),
    optArrivalBefore: createValidateOptWhen('arrivalBefore'),
    optResults: validateOptResults,
    optInterval: validateOptInterval,
    optTransfers: validateOptTransfers,
    optVia: createValidateOptStation('via'),
    optDirection: createValidateOptStation('direction'),
    optCurrency: validateOptCurrency
})

module.exports = validateArgument
