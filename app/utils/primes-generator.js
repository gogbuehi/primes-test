// Utility for Generating Primes
var exports = module.exports = {};


/**
 * Method to test whether a value is prime
 * Note: This depends on an array of all primes
 *       up to the value provided.
 * @param   {int}       value         The value to test
 * @param   {int[]}     primesArray   An array of prime numbers
 * @returns {boolean}   False, if the value is divisible by a
 *                      number in the array
 *                      True, if the value appears to be prime
 *
 */
exports.primeTester = (value, primesArray) => {
  let currentPrime;
  for (let i = 0; i < primesArray.length; i++) {
    currentPrime = primesArray[i];
    if (value === currentPrime) return true;
    if ((value % currentPrime) === 0) {
      return false;
    }
  }
  return true;
};

/**
 * Method to generate an array of primes
 * @param   {int}   n   The number of primes to generate
 * @returns {int[]}     An ordered array of the first n primes
 */
exports.generateNPrimes = function(n) {
  if (n < 1) return [];
  let   lastPrime    = 2;
  let   currentValue = lastPrime;
  const primesArray  = [lastPrime];

  for (let i = 1; primesArray.length < n; i++) {

    if (exports.primeTester(++currentValue, primesArray)) {
      primesArray.push(currentValue);
    }
  }

  return primesArray;
};