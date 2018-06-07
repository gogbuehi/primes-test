const locreq                       = require('locreq')(__dirname);
const assert                       = require('assert');
const MultiplicationTableGenerator = locreq('app/utils/multiplication-table-generator');

const CONSTANTS = {
  intArray : [2,3,5,7,11]
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
    }
  }
}

const describeMultiplicationMatrix = () => {
  it('should return an empty array, if provided an empty array', multiplicationMatrix.it.shouldReturnEmptyArray);
  it('should return a 2-dimensional array, if provided an array of values', multiplicationMatrix.it.shouldReturn2DArray);
}


const describeMutltiplicationTableGenerator = () => {
  describe('#multiplicationMatrix()', describeMultiplicationMatrix);
};

describe('MultiplicationTableGenerator', describeMutltiplicationTableGenerator);