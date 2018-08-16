'use strict'

const tape = require('tape')
const util = require('./index')
const isFunction = require('lodash/isfunction')

const urlSafe = 'asd123'
const nonUrlSafe = 'asd|w«]}≠»d'
const nonString = 12345
const shortString = 'a'

tape('fptf-util.validateArgument', (t) => {
	// station, origin, destination
	for (let validateStation of [util.validateArgument.station, util.validateArgument.origin, util.validateArgument.destination]) {
		t.ok(isFunction(validateStation), 'station')

		t.ok(validateStation(urlSafe), 'station')
		t.throws(() => validateStation(nonUrlSafe), 'station')
		t.throws(() => validateStation(nonString), 'station')

		t.ok(validateStation({type: 'station', id: urlSafe, name: urlSafe}), 'station')
		t.throws(() => validateStation({type: 'station', id: nonUrlSafe, name: urlSafe}), 'station')
		t.throws(() => validateStation({type: 'station', id: nonString, name: urlSafe}), 'station')

		t.throws(() => validateStation(''), 'station')
		t.throws(() => validateStation({type: 'station', id: '', name: urlSafe}), 'station')
		t.throws(() => validateStation(), 'station')
		t.throws(() => validateStation({type: 'station', name: urlSafe}), 'station')
		t.throws(() => validateStation(null), 'station')
		t.throws(() => validateStation({type: 'station', id: null, name: urlSafe}), 'station')

		t.throws(() => validateStation({type: 'region', id: urlSafe, name: urlSafe}), 'station')
		t.throws(() => validateStation({type: 'stop', id: urlSafe, name: urlSafe}), 'station')
		t.throws(() => validateStation({id: urlSafe, name: urlSafe}), 'station')
		t.throws(() => validateStation({type: 'station', id: urlSafe}), 'station')
	}


	// query
	const validateQuery = util.validateArgument.query
	t.ok(validateQuery(urlSafe), 'query')
	t.ok(validateQuery(nonUrlSafe), 'query')
	t.ok(validateQuery(shortString), 'query')
	t.throws(() => validateQuery(nonString), 'query')
	t.throws(() => validateQuery(null), 'query')
	t.throws(() => validateQuery(), 'query')


	// query
	const validateLocation = util.validateArgument.location
	const longitude = 13.6
	const latitude = 50.25
	t.ok(validateLocation({type: 'location', longitude, latitude}), 'location')
	t.ok(validateLocation({type: 'location', longitude, latitude, otherAttribute: 'key'}), 'location')
	t.throws(() => validateLocation(), 'location')
	t.throws(() => validateLocation(null), 'location')
	t.throws(() => validateLocation(urlSafe), 'location')
	t.throws(() => validateLocation(nonString), 'location')
	t.throws(() => validateLocation({}), 'location')
	t.throws(() => validateLocation({type: 'location'}), 'location')
	t.throws(() => validateLocation({longitude, latitude}), 'location')
	t.throws(() => validateLocation({type: 'location', latitude}), 'location')
	t.throws(() => validateLocation({type: 'station', longitude, latitude}), 'location')
	t.throws(() => validateLocation({type: 'asddsa', longitude, latitude}), 'location')


	// opt
	const validateOpt = util.validateArgument.opt
	t.ok(validateOpt({}), 'opt')
	t.ok(validateOpt({attribute: 'key'}), 'opt')
	t.ok(validateOpt(), 'opt')
	t.throws(() => validateOpt(urlSafe), 'opt')
	t.throws(() => validateOpt(nonString), 'opt')
	t.throws(() => validateOpt(null), 'opt')


	// stationsOpt, stopsOpt, regionsOpt
	for (let validateStationsOpt of [util.validateArgument.stationsOpt, util.validateArgument.stopsOpt, util.validateArgument.regionsOpt]) {
		t.ok(validateStationsOpt({}), 'stationsOpt')
		t.ok(validateStationsOpt({attribute: 'key'}), 'stationsOpt')
		t.ok(validateStationsOpt(), 'stationsOpt')
		t.throws(() => validateStationsOpt(urlSafe), 'stationsOpt')
		t.throws(() => validateStationsOpt(nonString), 'stationsOpt')
		t.throws(() => validateStationsOpt(null), 'stationsOpt')
	}


	// stationsSearchOpt, stopsSearchOpt, regionsSearchOpt
	for (let validateStationsSearchOpt of [util.validateArgument.stationsSearchOpt, util.validateArgument.stopsSearchOpt, util.validateArgument.regionsSearchOpt]) {
		t.ok(validateStationsSearchOpt({}), 'stationsSearchOpt')
		t.ok(validateStationsSearchOpt({attribute: 'key'}), 'stationsSearchOpt')
		t.ok(validateStationsSearchOpt(), 'stationsSearchOpt')
		t.throws(() => validateStationsSearchOpt(urlSafe), 'stationsSearchOpt')
		t.throws(() => validateStationsSearchOpt(nonString), 'stationsSearchOpt')
		t.throws(() => validateStationsSearchOpt(null), 'stationsSearchOpt')
	}


	// stationsNearbyOpt, stopsNearbyOpt, regionsNearbyOpt
	for (let validateStationsNearbyOpt of [util.validateArgument.stationsNearbyOpt, util.validateArgument.stopsNearbyOpt, util.validateArgument.regionsNearbyOpt]) {
		t.ok(validateStationsNearbyOpt({}), 'stationsNearbyOpt')
		t.ok(validateStationsNearbyOpt({attribute: 'key'}), 'stationsNearbyOpt')
		t.ok(validateStationsNearbyOpt(), 'stationsNearbyOpt')
		t.throws(() => validateStationsNearbyOpt(urlSafe), 'stationsNearbyOpt')
		t.throws(() => validateStationsNearbyOpt(nonString), 'stationsNearbyOpt')
		t.throws(() => validateStationsNearbyOpt(null), 'stationsNearbyOpt')

		t.ok(validateStationsNearbyOpt({distance: 10}), 'stationsNearbyOpt')
		t.ok(validateStationsNearbyOpt({distance: 10014.16, otherAttribute: 'val'}), 'stationsNearbyOpt')
		t.ok(validateStationsNearbyOpt({distance: null}), 'stationsNearbyOpt')
		t.ok(validateStationsNearbyOpt({distance: undefined}), 'stationsNearbyOpt')
		t.throws(() => validateStationsNearbyOpt({distance: -100}), 'stationsNearbyOpt')
		t.throws(() => validateStationsNearbyOpt({distance: urlSafe}), 'stationsNearbyOpt')
		t.throws(() => validateStationsNearbyOpt({distance: {urlSafe}}), 'stationsNearbyOpt')
	}


	// optDistance
	const validateOptDistance = util.validateArgument.optDistance
	t.ok(validateOptDistance(10), 'optDistance')
	t.ok(validateOptDistance(10014.16), 'optDistance')
	t.ok(validateOptDistance(), 'optDistance')
	t.ok(validateOptDistance(null), 'optDistance')
	t.ok(validateOptDistance(0), 'optDistance')
	t.throws(() => validateOptDistance(''), 'optDistance')
	t.throws(() => validateOptDistance({}), 'optDistance')
	t.throws(() => validateOptDistance(-100), 'optDistance')
	t.throws(() => validateOptDistance(urlSafe), 'optDistance')
	t.throws(() => validateOptDistance({urlSafe}), 'optDistance')


	// optWhen
	const validateOptWhen = util.validateArgument.optWhen
	t.ok(validateOptWhen(new Date()), 'optWhen')
	t.ok(validateOptWhen(new Date(100)), 'optWhen')
	t.ok(validateOptWhen(), 'optWhen')
	t.ok(validateOptWhen(null), 'optWhen')
	t.throws(() => validateOptWhen(''), 'optWhen')
	t.throws(() => validateOptWhen(0), 'optWhen')
	t.throws(() => validateOptWhen({}), 'optWhen')
	t.throws(() => validateOptWhen(+new Date()), 'optWhen')
	t.throws(() => validateOptWhen(nonString), 'optWhen')
	t.throws(() => validateOptWhen(urlSafe), 'optWhen')
	t.throws(() => validateOptWhen({urlSafe}), 'optWhen')


	// optResults
	const validateOptResults = util.validateArgument.optResults
	t.ok(validateOptResults(1), 'optResults')
	t.ok(validateOptResults(192), 'optResults')
	t.ok(validateOptResults(), 'optResults')
	t.ok(validateOptResults(null), 'optResults')
	t.throws(() => validateOptResults(''), 'optResults')
	t.throws(() => validateOptResults(0), 'optResults')
	t.throws(() => validateOptResults({}), 'optResults')
	t.throws(() => validateOptResults(new Date()), 'optResults')
	t.throws(() => validateOptResults(-20), 'optResults')
	t.throws(() => validateOptResults(1.26), 'optResults')
	t.throws(() => validateOptResults(urlSafe), 'optResults')
	t.throws(() => validateOptResults({urlSafe}), 'optResults')


	t.end()
})
