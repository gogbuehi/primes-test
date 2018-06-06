const locreq          = require('locreq')(__dirname);
const assert          = require('assert');
const PrimesGenerator = locreq('app/utils/primes-generator');


const generateNPrimes = {
  it: {
    shouldReturnArrayLengthOfN: () => {
      let nPrimes;
      for (let i = 0; i < 3; i++) {
        nPrimes = PrimesGenerator.generateNPrimes(i);
        assert.equal(nPrimes.length, i);
      }
    }
  }
}

const describeGenerateNPrimes = () => {
  it('should return an array of length n', generateNPrimes.it.shouldReturnArrayLengthOfN);
};
const describePrimesGenerator = () => {
  describe('#generateNPrimes()', describeGenerateNPrimes);
};

describe('PrimesGenerator', describePrimesGenerator);