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
} = require('../helpers');

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

  context('it should create an object with all drivers in it', () => {
    it('should return an object', () => {
      expect(typeof storeDrivers(input)).to.equal('object');
    });
    it('should not return an array', () => {
      expect(Array.isArray(storeDrivers(input))).to.equal(false);
    });
    it('should represent all drivers', () => {
      expect(Object.keys(storeDrivers(input)).includes('Dan')).to.equal(true);
      expect(Object.keys(storeDrivers(input)).includes('Kumi')).to.equal(true);
      expect(Object.keys(storeDrivers(input)).includes('Lauren')).to.equal(true);
    });
  });
});



// trip split function?
// driver split function?
// trip pruning function?
// aggregate trips function?
// result function?
// return text file function?
