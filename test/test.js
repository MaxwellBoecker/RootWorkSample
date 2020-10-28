const assert = require('assert');
const { expect } = require('chai');

const {
  getDrivers,
  getTrips,
  storeDrivers,
  tripParser,
  pruneTrips,
  tripAggregator,
  createResult,
} = require('../indexFunctionDefs');

describe('getDrivers, getTrips', () => {
  let input = [];
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
  });

  context('getDrivers', () => {
    it('should return array of strings representing drivers', () => {
      expect(getDrivers(input).length).to.equal(3);
    });
  });

  context('getTrips', () => {
    it('should return an array of strings representing trips', () => {
      expect(getTrips(input).length).to.equal(5);
    });
  });
});

describe('storeDrivers', () => {
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

  context('It should create an object with all drivers in it', () => {
    it('Should return an object', () => {
      expect(typeof storeDrivers(input)).to.equal('object');
    });
    it('Should not return an array', () => {
      expect(Array.isArray(storeDrivers(input))).to.equal(false);
    });
    it('Should represent all drivers', () => {
      expect(Object.keys(storeDrivers(input)).includes('Dan')).to.equal(true);
      expect(Object.keys(storeDrivers(input)).includes('Kumi')).to.equal(true);
      expect(Object.keys(storeDrivers(input)).includes('Lauren')).to.equal(true);
    });
  });
});

describe('tripParser', () => {
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
  context('Should return an array of objects', () => {
    it('Should return an array', () => {
      expect(Array.isArray(tripParser(getTrips(input)))).to.equal(true);
    });
    it('The returned array should contain only objects', () => {
      tripParser(getTrips(input)).forEach(trip => {
        expect(typeof trip === 'object').to.equal(true);
      });
    });
  });
  context('Returned objects should contain driver, distance and hours keys', () => {
    it('The objects should contain a driver key', () => {
      tripParser(getTrips(input)).forEach(trip => {
        expect(Object.keys(trip).includes('driver')).to.equal(true);
      });
    });
    it('The objects should contain a distance key', () => {
      tripParser(getTrips(input)).forEach(trip => {
        expect(Object.keys(trip).includes('distance')).to.equal(true);
      });
    });
    it('The objects should contain an hours key', () => {
      tripParser(getTrips(input)).forEach(trip => {
        expect(Object.keys(trip).includes('hours')).to.equal(true);
      });
    });
  })
});

describe('pruneTrips', () => {
  let input = [];
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

  });
  context('It should discard trips with average speed below 5 mph or above 100 mph', () => {
    it('Should remove trips with average speed below 5 mph or above 100 mph', () => {
      expect(pruneTrips(tripParser(getTrips(input))).length === 3).to.equal(true);
    })
  })
});

describe('tripAggregator', () => {
  let input = [];
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
    trips = pruneTrips(tripParser(getTrips(input)));
    drivers = storeDrivers(getDrivers(input));
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
      })
    });
    // it('Object stored at each key should contain a distance key', () => {
    //   Object.values(tripAggregator(trips, drivers)).forEach(value => {
    //     console.log(value);
    //     expect(Object.keys(value).includes('distance')).to.equal(true);
    //   });
    // });
  });
});


// trip split function?
// driver split function?
// trip pruning function?
// aggregate trips function?
// result function?
// return text file function?
