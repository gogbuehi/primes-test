const locreq                       = require('locreq')(__dirname);
const assert                       = require('assert');
const MultiplicationTableGenerator = locreq('app/utils/multiplication-table-generator');

const CONSTANTS = {
  intArray : [2,3,5,7,11],
  multiplicationMatrix : [
    [  4,  6, 10, 14, 22],
    [  6,  9, 15, 21, 33],
    [ 10, 15, 25, 35, 55],
    [ 14, 21, 35, 49, 77],
    [ 22, 33, 55, 77,121]
  ]
}

const multiplicationMatrix = {
  it: {
    shouldReturnEmptyArray: () => {
      const matrix = MultiplicationTableGenerator.multiplicationMatrix([]);
      assert.equal(matrix.length, 0);
    },
    shouldReturn2DArray: () => {
      const matrix = MultiplicationTableGenerator.multiplicationMatrix(CONSTANTS.intArray);
      assert.equal(matrix.length, CONSTANTS.intArray.length);
      assert.equal(matrix[0].length, CONSTANTS.intArray.length);
    },
    shouldReturnMultiplicationMatrix: () => {
      const matrix = MultiplicationTableGenerator.multiplicationMatrix(CONSTANTS.intArray);
      assert.deepEqual(matrix, CONSTANTS.multiplicationMatrix);
    }
  }
}

const describeMultiplicationMatrix = () => {
  it('should return an empty array, if provided an empty array', multiplicationMatrix.it.shouldReturnEmptyArray);
  it('should return a 2-dimensional array, if provided an array of values', multiplicationMatrix.it.shouldReturn2DArray);
  it('should return a matrix of multiples of the provided array of integers', multiplicationMatrix.it.shouldReturnMultiplicationMatrix);
}


const describeMutliplicationTableGenerator = () => {
  describe('#multiplicationMatrix()', describeMultiplicationMatrix);
};

describe('MultiplicationTableGenerator', describeMutliplicationTableGenerator);