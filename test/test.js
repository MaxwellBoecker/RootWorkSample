const assert = require('assert');
const { expect } = require('chai');

const {
  splitDriversAndTrips,
  storeDrivers,
  tripParser,
  pruneTrips,
  tripAggregator,
  createResult,
} = require('../indexFunctionDefs');

describe('splitDriversAndTrips', () => {
  let input = [];
  beforeEach(() => {
    input = [
      'Driver Dan',
      'Driver Lauren',
      'Driver Kumi',
      'Trip Dan 07:15 07:45 17.3',
      'Trip Dan 06:12 06:32 21.8',
      'Trip Lauren 12:01 13:16 42.0',
    ];
  });
  context('Should return an object with two keys, drivers and trips', () => {
    it('Should be an object', () => {
      expect(typeof splitDriversAndTrips(input)).to.equal('object');
    });
    it('Should have two keys, drivers and trips', () => {
      expect(Object.keys(splitDriversAndTrips(input)).includes('trips')).to.equal(true);
      expect(Object.keys(splitDriversAndTrips(input)).includes('drivers')).to.equal(true);
    });
    it('Each key should have an array as its value', () => {
      expect(Array.isArray(splitDriversAndTrips(input).drivers)).to.equal(true);
      expect(Array.isArray(splitDriversAndTrips(input).trips)).to.equal(true);
    });
  });
});

describe('storeDrivers', () => {
  let drivers;
  beforeEach(() => {
    input = [
      'Driver Dan',
      'Driver Lauren',
      'Driver Kumi',
      'Trip Dan 07:15 07:45 17.3',
      'Trip Dan 06:12 06:32 21.8',
      'Trip Lauren 12:01 13:16 42.0',
    ];
    drivers = splitDriversAndTrips(input).drivers;
  });

  context('It should create an object with all drivers in it', () => {
    it('Should return an object', () => {
      expect(typeof storeDrivers(drivers)).to.equal('object');
    });
    it('Should not return an array', () => {
      expect(Array.isArray(storeDrivers(drivers))).to.equal(false);
    });
    it('Should represent all drivers', () => {
      expect(Object.keys(storeDrivers(drivers)).includes('Dan')).to.equal(true);
      expect(Object.keys(storeDrivers(drivers)).includes('Kumi')).to.equal(true);
      expect(Object.keys(storeDrivers(drivers)).includes('Lauren')).to.equal(true);
    });
  });
});

describe('tripParser', () => {
  let input = [];
  let trips;
  beforeEach(() => {
    input = [
      'Driver Dan',
      'Driver Lauren',
      'Driver Kumi',
      'Trip Dan 07:15 07:45 17.3',
      'Trip Dan 06:12 06:32 21.8',
      'Trip Lauren 12:01 13:16 42.0',
    ];
    trips = splitDriversAndTrips(input).trips;
  });
  context('Should return an array of objects', () => {
    it('Should return an array', () => {
      expect(Array.isArray(tripParser(trips))).to.equal(true);
    });
    it('The returned array should contain only objects', () => {
      tripParser(trips).forEach(trip => {
        expect(typeof trip === 'object').to.equal(true);
      });
    });
  });
  context('Returned objects should contain driver, distance and hours keys', () => {
    it('The objects should contain a driver key', () => {
      tripParser(trips).forEach(trip => {
        expect(Object.keys(trip).includes('driver')).to.equal(true);
      });
    });
    it('The objects should contain a distance key', () => {
      tripParser(trips).forEach(trip => {
        expect(Object.keys(trip).includes('distance')).to.equal(true);
      });
    });
    it('The objects should contain an hours key', () => {
      tripParser(trips).forEach(trip => {
        expect(Object.keys(trip).includes('hours')).to.equal(true);
      });
    });
  });
});

describe('pruneTrips', () => {
  let input = [];
  let trips;
  beforeEach(() => {
    input = [
      'Driver Dan',
      'Driver Lauren',
      'Driver Kumi',
      'Trip Dan 07:15 07:45 17.3',
      'Trip Dan 06:12 06:32 21.8',
      'Trip Lauren 12:01 13:16 42.0',
      'Trip Dan 07:15 07:45 150',
      'Trip Dan 07:15 19:36 9',
    ];
    trips = splitDriversAndTrips(input).trips;
  });
  context('It should discard trips with average speed below 5 mph or above 100 mph', () => {
    it('Should remove trips with average speed below 5 mph or above 100 mph', () => {
      expect(pruneTrips(tripParser(trips)).length === 3).to.equal(true);
    });
  });
});

describe('tripAggregator', () => {
  let trips;
  let drivers;
  beforeEach(() => {
    input = [
      'Driver Dan',
      'Driver Lauren',
      'Driver Kumi',
      'Trip Dan 07:15 07:45 17.3',
      'Trip Dan 06:12 06:32 21.8',
      'Trip Lauren 12:01 13:16 42.0',
      'Trip Dan 07:15 07:45 150',
      'Trip Dan 07:15 19:36 9',
    ];
    trips = pruneTrips(tripParser(splitDriversAndTrips(input).trips));
    drivers = storeDrivers(splitDriversAndTrips(input).drivers);
  });
  context('It should return an object with keys representing each driver', () => {
    it('Should return an object', () => {
      expect(typeof tripAggregator(trips, drivers) === 'object').to.equal(true);
    });
    it('The returned object should have a key for each driver', () => {
      expect(Object.keys(tripAggregator(trips, drivers)).length === 3).to.equal(true);
    });
  });
  context('Each key in the returned object should have an object as its value', () => {
    it('Should have an object stored at each key', () => {
      Object.values(tripAggregator(trips, drivers)).forEach(value => {
        expect(typeof value === 'object').to.equal(true);
      });
    });
    // it('Object stored at each key should contain a distance key', () => {
    //   Object.values(tripAggregator(trips, drivers)).forEach(value => {
    //     console.log(value);
    //     expect(Object.keys(value).includes('distance')).to.equal(true);
    //   });
    // });
  });
});

describe('createResult', () => {
  let aggregation;
  beforeEach(() => {
    input = [
      'Driver Dan',
      'Driver Lauren',
      'Driver Kumi',
      'Trip Dan 07:15 07:45 17.3',
      'Trip Dan 06:12 06:32 21.8',
      'Trip Lauren 12:01 13:16 42.0',
      'Trip Dan 07:15 07:45 150',
      'Trip Dan 07:15 19:36 9',
    ];
    trips = pruneTrips(tripParser(splitDriversAndTrips(input).trips));
    drivers = storeDrivers(splitDriversAndTrips(input).drivers);
    aggregation = tripAggregator(trips, drivers);
  });
  context('Should return a string that contains the driving information for every driver', () => {
    it('Should return a string', () => {
      expect(typeof createResult(aggregation)).to.equal('string');
    });
    it('Should be correctly formatted', () => {
      expect(createResult(aggregation).includes('Lauren: 42 miles @ 34 mph')).to.equal(true);
    });
    it('Should be correctly formatted for 0 miles', () => {
      expect(createResult(aggregation).includes('Kumi: 0 miles')).to.equal(true);
    });
  });
});
