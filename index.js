const fs = require('fs');
const {
  splitDriversAndTrips,
  storeDrivers,
  tripParser,
  pruneTrips,
  tripAggregator,
  createResult,
} = require('./indexFunctionDefs.js');

const driversAndTrips = fs.readFileSync(0).toString().split('\n');

const { trips, drivers } = splitDriversAndTrips(driversAndTrips);

const driversObj = storeDrivers(drivers);

const parsedTrips = tripParser(trips);

const prunedTrips = pruneTrips(parsedTrips);

// aggregatedTrips is the result of combining driversObj with the prunedTrips.
// This allows us to aggregate the data if a driver has multiple trips
// and more easily compute the average speed. It is an object of objects.
const aggregatedTrips = tripAggregator(prunedTrips, driversObj);

const result = createResult(aggregatedTrips);

fs.writeFileSync('./output.txt', result);
