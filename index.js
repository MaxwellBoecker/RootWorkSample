const fs = require('fs');
const {
  getDrivers,
  getTrips,
  storeDrivers,
  tripParser,
  pruneTrips,
  tripAggregator,
  createResult,
} = require('./helpers.js');

// The variable driversAndTrips is the result of reading the input file
// from the command line. I turn it into an array of strings with split()
const driversAndTrips = fs.readFileSync(0).toString().split('\n');

// The variable trips is the result of filtering driversAndTrips to only include trips
const trips = getTrips(driversAndTrips);

// The variable drivers is the result of filtering driversAndTrips to only include drivers
const drivers = getDrivers(driversAndTrips);

// driversObj is an object that contains a key for each driver and
// an empty object stored at each key. It will be fed to tripAggregator.
const driversObj = storeDrivers(drivers);

// The variable parsedTrips is an array of objects which contain pertinent data
// about trips; 'trip objects'
const parsedTrips = tripParser(trips);

// The variable prunedTrips is an array of 'trip objects' with trips with average speed above
// 100 mph or below 5 mph filtered out.
const prunedTrips = pruneTrips(parsedTrips);

// The variable aggregatedTrips is the result of combining driversObj with the prunedTrips.
// This allows us to aggregate the data if a driver has multiple trips
// and more easily compute the average speed. It is an object of objects.
const aggregatedTrips = tripAggregator(prunedTrips, driversObj);

// This is the final product! Turns the aggregatedTrips obj back into a string!
const result = createResult(aggregatedTrips);

// const result = createResult(tripAggregator(pruneTrips(tripParser(trips)), driversObj));

console.log(result);
