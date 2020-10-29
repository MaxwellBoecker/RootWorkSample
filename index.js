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

const aggregatedTrips = tripAggregator(prunedTrips, driversObj);

const result = createResult(aggregatedTrips);

fs.writeFileSync('./output.txt', result);
