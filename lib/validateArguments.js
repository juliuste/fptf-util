'use strict'

const validateFptf = require('validate-fptf')()
const isString = require('lodash/isstring')
const isObject = require('lodash/isobject')

const error = message => {throw new Error(message); return false}

const validateStation = s => {
    const message = 'station must be an FPTF `station` object or id.'
    validateFptf(s)
    if (isString(s)) {
        if (s.length === 0) error(message+1)
    } else if (isObject(s)) {
        if (s.type !== 'station') error(message+2)
    } else error(message+3)
    return true
}

const validateQuery = q => {
    const message = 'query must be an non-empty string'
    if (!isString(q)) error(message)
    if (q.length === 0) error(message)
    return true
}

const validateArguments = ({
    station: validateStation,
    query: validateQuery
})

module.exports = validateArguments
