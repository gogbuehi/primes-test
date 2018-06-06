const locreq          = require('locreq')(__dirname);
const assert          = require('assert');
const PrimesGenerator = locreq('app/utils/primes-generator');


const CONSTANTS = {
  tenPrimes: [2,3,5,7,11,13,17,19,23,29]
}

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
      const n = 10;
      let nPrimes = PrimesGenerator.generateNPrimes(n);

      assert.deepEqual(CONSTANTS.tenPrimes, nPrimes);
    }
  }
}

const describeGenerateNPrimes = () => {
  it('should return an array of length n', generateNPrimes.it.shouldReturnArrayLengthOfN);
  it('should return an array of n primes', generateNPrimes.it.shouldReturnArrayOfNPrimes);
};
const describePrimesGenerator = () => {
  describe('#generateNPrimes()', describeGenerateNPrimes);
};

describe('PrimesGenerator', describePrimesGenerator);