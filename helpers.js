/**
 * @name getDrivers
 * @param {array} driversAndTrips an array of strings which represent Drivers and Trips
 * @returns {array} an array of strings which represent drivers
 */
const getDrivers = (driversAndTrips) => driversAndTrips.filter((string) => string.split(' ').length === 2);

/**
 * @name getTrips
 * @param {array} driversAndTrips an array of strings which represent Drivers and Trips
 * @returns {array} an array of strings which represent Trips
 */
const getTrips = (driversAndTrips) => driversAndTrips.filter((string) => string.split(' ').length === 5);

/**
 * @name storeDrivers
 * @param {array} drivers the array of drivers resulting from getDrivers()
 * @returns {object} an object with driver names as keys and empty objects as values
 */
const storeDrivers = (drivers) => drivers.reduce((obj, cur) => {
  const driver = cur.split(' ')[1];
  obj[driver] = {};
  return obj;
}, {});

/**
 * @name tripParser
 * @param {array} trips this is the array of strings (trips) from the input file
 * @return {array} an array of objects (trips turned into objects)
 */
const tripParser = (trips) => trips.map((tripString) => {
  const trip = tripString.split(' ').slice(1);
  const minutesAtStart = ((trip[1].split(':')[0] * 1) * 60) + (trip[1].split(':')[1] * 1);
  const minutesAtEnd = ((trip[2].split(':')[0] * 1) * 60) + (trip[2].split(':')[1] * 1);
  const hours = (minutesAtEnd - minutesAtStart) / 60;
  const distance = trip[3] * 1;

  return {
    driver: trip[0],
    distance,
    hours,
  };
});

const pruneTrips = (trips) => trips.filter((trip) => {
  const mph = trip.distance / trip.hours;
  if (mph >= 5 && mph <= 100) {
    return trip;
  }
});

const tripAggregator = (prunedTrips, driversObj) => prunedTrips.reduce((accumulator, trip) => {
  const driverStats = accumulator[trip.driver];
  if (driverStats.distance) {
    driverStats.distance += trip.distance;
    driverStats.hours += trip.hours;
  } else {
    driverStats.distance = trip.distance;
    driverStats.hours = trip.hours;
  }
  return accumulator;
}, driversObj);

const createResult = (aggregatedTrips) => Object.entries(aggregatedTrips).map((stats) => {
  if (stats[1].distance !== undefined) {
    const mph = stats[1].distance / stats[1].hours;
    return `${stats[0]}: ${Math.round(stats[1].distance)} miles @ ${Math.round(mph)} mph`;
  }
  return `${stats[0]}: 0 miles`;
}).sort((a, b) => b.split(' ')[1] - a.split(' ')[1]).join('\n');

module.exports = {
  getDrivers,
  getTrips,
  storeDrivers,
  tripParser,
  pruneTrips,
  tripAggregator,
  createResult,
};
