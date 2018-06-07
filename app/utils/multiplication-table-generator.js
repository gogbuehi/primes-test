// Utility for Generating Multiplication Table Data
var exports = module.exports = {};

exports.multiplicationMatrix = (intArray) => {
  const matrix = [];

  for(let i = 0; i < intArray.length; i++) {
    matrix[i] = [];
    for(let j = 0; j < intArray.length; j++) {
      matrix[i][j] = intArray[i] * intArray[j];
    }
  }

  return matrix;
};