/**
 * @name getDrivers
 * @param {array} driversAndTrips An array of strings which represent Driver commands and
 * Trip commands from the input.txt file
 * @returns {array} an array of strings which represent each driver command from the input.txt
 */
const getDrivers = (driversAndTrips) => driversAndTrips.filter((string) => string.includes('Driver') === true);

/**
 * @name getTrips
 * @param {array} driversAndTrips an array of strings which represent Drivers and Trips
 * @returns {array} an array of strings which represent each Trip command from the input.txt
 */
const getTrips = (driversAndTrips) => driversAndTrips.filter((string) => string.includes('Trip') === true);

/**
 * @name storeDrivers
 * @param {array} drivers The array of driver strings resulting from getDrivers()
 * @returns {object} an object with driver names as keys and empty objects as values
 */
const storeDrivers = (drivers) => drivers.reduce((obj, cur) => {
  const driver = cur.split(' ')[1];
  obj[driver] = {};
  return obj;
}, {});

/**
 * @name tripParser
 * @param {array} trips This is the array of strings (trips) from the input file
 * @return {array} An array of objects (trips turned into objects). Each object contains
 * a driver, distance and  hours key.
 */
const tripParser = (trips) => trips.map((tripString) => {
  const trip = tripString.split(' ').slice(1);
  const minutesAtStart = (parseFloat(trip[1].split(':')[0]) * 60) + (parseFloat(trip[1].split(':')[1]));
  const minutesAtEnd = (parseFloat(trip[2].split(':')[0]) * 60) + (parseFloat(trip[2].split(':')[1]));
  const hours = (minutesAtEnd - minutesAtStart) / 60;
  const distance = parseFloat(trip[3]);

  return {
    driver: trip[0],
    distance,
    hours,
  };
});

/**
 * @name pruneTrips
 * @param {array} trips This is the array which is returned from tripParser()
 * @return {array} The input array with all trip objects which have an average speed of over 100 mph
 * or below 5 mph removed. Thus the trips have been pruned
 */
const pruneTrips = (trips) => trips.filter((trip) => {
  const mph = trip.distance / trip.hours;
  if (mph >= 5 && mph <= 100) {
    return trip;
  }
});

/**
 * @name tripAggregator
 * @param {array} prunedTrips
 * @param {object} driversObj
 * @return {object} The object returned contains a key for each driver, whose value is an object
 * containing that driver's total distance traveled and total time (hours) spent traveling.
 */
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

/**
 * @name createResult
 * @param {object} aggregatedTrips the object returned from tripAggregator
 * @return {string} a string of all the total results for each driver.
 */
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
