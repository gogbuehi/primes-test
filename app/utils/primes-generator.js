// Utility for Generating Primes
var exports = module.exports = {};

/**
 * Method to generate an array of primes
 * @param   {int} n   The number of primes to generate
 * @returns {int[]}   An ordered array of the first n primes
 */
exports.generateNPrimes = (n) => {
  if (n < 1) return [];
  let   lastPrime    = 2;
  let   currentValue = lastPrime;
  const primesArray  = [lastPrime];
  let currentPrime, isPrime;
  for (let i = 1; primesArray.length < n; i++) {
    ++currentValue;
    isPrime = true;
    for (let j = 0; j < primesArray.length; j++) {
      currentPrime = primesArray[j];
      if ((currentValue % currentPrime)=== 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primesArray.push(currentValue);
    }
  }

  return primesArray;
};