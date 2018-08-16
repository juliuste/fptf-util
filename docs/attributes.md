# Validating user input

The `fpti-util` provides several helper methods to check if user input arguments match the [FPTI-JS](https://github.com/juliuste/fpti-js) specification. There are two different subsets of these methods:

- `validateMethodArguments` - Validate all arguments for a specific method, use this if you provide a “normal” FPTI module.
- `validateArgument` - Validate a specific argument/option. Allows for more fine-grained checks. You should probably only use this if you provide additional features in the **non-optional** arguments, e.g. if you also accept `region`s as `origin` and `destination` for `journeys`, instead of only `stations` (as specified in the fpti-js spec).

## API

Helper functions are available for the following FPTI methods:

- [`stations(opt) / stops(opt) / regions(opt)`](#stationsopt--stopsopt--regionsopt)
- [`stations.search(opt) / stops.search(opt) / regions.search(opt)`](#stationssearchopt--stopssearchopt--regionssearchopt)
- [`stations.nearby(opt) / stops.nearby(opt) / regions.nearby(opt)`](#stationsnearbyopt--stopsnearbyopt--regionsnearbyopt)
- [`journeys(origin, destination, opt)`](#journeysorigin-destination-opt)
- [`stopovers(station, opt)`](#stopoversstation-opt)

---

### `stations(opt) / stops(opt) / regions(opt)`

Use `validateMethodArguments.stations` to validate all arguments of the `stations` method (analogous for `stops` and `regions`):

```js
const validateStations = require('fpti-util').validateMethodArguments.stations
// const validateStations = require('fpti-util/lib/validate-method-arguments').stations // alternatively

// your implementation of the stations() method
const stations = (opt) => {
    validateStations(opt) // throws if invalid

    // your code
}
```

---

### `stations.search(opt) / stops.search(opt) / regions.search(opt)`

Use `validateMethodArguments.stationsSearch` to validate all arguments of the `stations.search` method (analogous for `stops.search` and `regions.search`):

```js
const validateStationsSearch = require('fpti-util').validateMethodArguments.stationsSearch
// const validateStationsSearch = require('fpti-util/lib/validate-method-arguments').stationsSearch // alternatively

// your implementation of the stations.search() method
const search = (opt) => {
    validateStationsSearch(opt) // throws if invalid

    // any additional validation for opt, if your module provides other options
    // your code
}
```

---

### `stations.nearby(opt) / stops.nearby(opt) / regions.nearby(opt)`

Use `validateMethodArguments.stationsNearby` to validate all arguments of the `stations.nearby` method (analogous for `stops.nearby` and `regions.nearby`):

```js
const validateStationsNearby = require('fpti-util').validateMethodArguments.stationsNearby
// const validateStationsNearby = require('fpti-util/lib/validate-method-arguments').stationsNearby // alternatively

// your implementation of the stations.nearby() method
const nearby = (opt) => {
    validateStationsNearby(opt) // throws if invalid

    // any additional validation for opt, if your module provides other options
    // your code
}
```

You can also use the following methods from `validateArgument` to validate single attributes of `opt`:

- `optDistance(x)`

```js
const validateOptDistance = require('fpti-util').validateArgument.optDistance
// const validateOptDistance = require('fpti-util/lib/validate-argument').optDistance // alternatively

validateOptDistance(10) // doesn't throw
validateOptDistance(null) // doesn't throw
validateOptDistance() // doesn't throw
validateOptDistance('asd') // throws
validateOptDistance(-100) // throws
```

---

### `journeys(origin, destination, opt)`

Use `validateMethodArguments.journeys` to validate all arguments of the `journeys` method:

```js
const validateJourneys = require('fpti-util').validateMethodArguments.journeys
// const validateJourneys = require('fpti-util/lib/validate-method-arguments').journeys // alternatively

// your implementation of the journeys() method
const journeys = (origin, destination, opt) => {
    validateJourneys(origin, destination, opt) // throws if invalid

    // any additional validation for opt, if your module provides other options
    // your code
}
```

You can also use the following methods from `validateArgument` to validate single attributes of `opt`:

- `origin(x)`
- `destination(x)`
- `optWhen(x)`
- `optResults(x)`
- `optInterval(x)`
- `optTransfers(x)`
- `optDepartureAfter(x)`
- `optArrivalBefore(x)`
- `optVia(x)`
- `optCurrency(x)`

```js
const validateOptWhen = require('fpti-util').validateArgument.optWhen
// const validateOptWhen = require('fpti-util/lib/validate-argument').optWhen // alternatively

validateOptWhen(new Date()) // doesn't throw
validateOptWhen(new Date('2019-01-15')) // doesn't throw
validateOptWhen(null) // doesn't throw
validateOptWhen() // doesn't throw
validateOptWhen(+new Date()) // throws
validateOptWhen(10000) // throws
validateOptWhen(10000) // throws
validateOptWhen('asd') // throws
```

---

### `stopovers(station, opt)`

Use `validateMethodArguments.stopovers` to validate all arguments of the `stopovers` method:

```js
const validateStopovers = require('fpti-util').validateMethodArguments.stopovers
// const validateStopovers = require('fpti-util/lib/validate-method-arguments').stopovers // alternatively

// your implementation of the stopovers() method
const stopovers = (station, opt) => {
    validateStopovers(station, opt) // throws if invalid

    // any additional validation for opt, if your module provides other options
    // your code
}
```

You can also use the following methods from `validateArgument` to validate single attributes of `opt`:

- `station(x)`
- `optWhen(x)`
- `optResults(x)`
- `optInterval(x)`
- `optDepartureAfter(x)`
- `optArrivalBefore(x)`
- `optDirection(x)`

```js
const validateOptDirection = require('fpti-util').validateArgument.optDirection
// const validateOptDirection = require('fpti-util/lib/validate-argument').optDirection // alternatively

validateOptDirection('id123') // doesn't throw
validateOptDirection({type: 'station', id: 'id123', name: 'Main station'}) // doesn't throw
validateOptDirection(null) // doesn't throw
validateOptDirection() // doesn't throw
validateOptDirection({type: 'stop', id: 'id123', name: 'Main station'}) // throws
validateOptDirection(12345) // throws
validateOptDirection({id: 'id123'}) // throws
```
