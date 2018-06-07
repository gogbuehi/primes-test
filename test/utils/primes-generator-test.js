const locreq          = require('locreq')(__dirname);
const assert          = require('assert');
const PrimesGenerator = locreq('app/utils/primes-generator');


const CONSTANTS = {
  notAPrime1   : 4,
  notAPrime2   : 30,
  tenPrimes    : [2,3,5,7,11,13,17,19,23,29],
  aBiggerPrime : 31
};

const primeTester = {
  it: {
    shouldReturnFalseIfNotPrime: () => {
      assert.equal(PrimesGenerator.primeTester(CONSTANTS.notAPrime1, CONSTANTS.tenPrimes), false);
      assert.equal(PrimesGenerator.primeTester(CONSTANTS.notAPrime2, CONSTANTS.tenPrimes), false);
    },
    shouldReturnTrueIfPrime: () => {
      for (let i = 0; i < CONSTANTS.tenPrimes.length; i++) {
        assert(PrimesGenerator.primeTester(CONSTANTS.tenPrimes[i], CONSTANTS.tenPrimes));
      }

      assert(PrimesGenerator.primeTester(CONSTANTS.aBiggerPrime, CONSTANTS.tenPrimes));
    }
  }
};

const generateNPrimes = {
  it: {
    shouldReturnArrayLengthOfN: () => {
      let nPrimes;
      for (let i = 0; i < 3; i++) {
        nPrimes = PrimesGenerator.generateNPrimes(i);
        assert.equal(nPrimes.length, i);
      }
    },
    shouldReturnArrayOfNPrimes: () => {
      const n       = 10;
      const nPrimes = PrimesGenerator.generateNPrimes(n);

      assert.deepEqual(CONSTANTS.tenPrimes, nPrimes);
    },
    shouldGeneratePrimesQuickly: () => {
      const n           = 40000;
      const maximumTime = 100;
      const startTime   = new Date().getTime();
      PrimesGenerator.generateNPrimes(n);
      const endTime     = new Date().getTime();
      const timeToRun   = endTime-startTime;

      assert(timeToRun < maximumTime, `Generating ${n} primes should take less than ${maximumTime}ms`)
    }
  }
}

const describePrimeTester = () => {
  it('should return false, if value is not prime', primeTester.it.shouldReturnFalseIfNotPrime);
  it('should return true, if value is prime', primeTester.it.shouldReturnTrueIfPrime);
};
const describeGenerateNPrimes = () => {
  it('should return an array of length n', generateNPrimes.it.shouldReturnArrayLengthOfN);
  it('should return an array of n primes', generateNPrimes.it.shouldReturnArrayOfNPrimes);
  it('should generate primes quickly', generateNPrimes.it.shouldGeneratePrimesQuickly);
};

const describePrimesGenerator = () => {
  describe('#primeTester()', describePrimeTester);
  describe('#generateNPrimes()', describeGenerateNPrimes);
};

describe('PrimesGenerator', describePrimesGenerator);