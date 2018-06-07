// Utility for Generating Multiplication Table Data
var exports = module.exports = {};

/**
 * Generate a matrix of all multiples from an array of factors
 * @param   {int[]}   intArray  The factors to use
 * @returns {int[][]} A matrix of all the multiples
 */
exports.multiplicationMatrix = function(intArray) {
  const matrix = [];

  for(let i = 0; i < intArray.length; i++) {
    matrix[i] = [];
    for(let j = 0; j < intArray.length; j++) {
      matrix[i][j] = intArray[i] * intArray[j];
    }
  }

  return matrix;
};

/**
 * Generate a matrix that represents a multiplication table
 * @param   {int[]}   intArray  The factors to use
 * @returns {int[][]} A matrix with a factors row and column,
 *                    and the matrix of the multiples.
 */
exports.multiplicationTable = (intArray) => {
  if (intArray.length === 0) return [];
  const matrix = exports.multiplicationMatrix(intArray);
  let intArrayToDisplay = [''].concat(intArray);
  matrix.unshift(intArrayToDisplay);

  for (let i = 1; i < intArrayToDisplay.length; i++) {
    matrix[i].unshift(intArrayToDisplay[i]);
  }
  return matrix;
}