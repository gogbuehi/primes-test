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
    },
    shouldReturnMultiplicationMatrix: () => {
      const matrix = MultiplicationTableGenerator.multiplicationMatrix(CONSTANTS.intArray);
      let valuesArray;
      for(let i = 0; i < matrix.length; i++) {
        valuesArray = matrix[i];
        for(let j = 0; j < valuesArray.length; j++) {
          assert.equal(matrix[i][j], CONSTANTS.intArray[i] * CONSTANTS.intArray[j]);
          assert.equal(matrix[i][j], matrix[j][i]);
        }
      }
    }
  }
};

const multiplicationTable = {
  it: {
    shouldReturnEmptyArray: () => {
      const table = MultiplicationTableGenerator.multiplicationTable([]);
      assert.equal(table.length, 0);
    },
    shouldReturnAMatrixOneGreater: () => {
      const tableSize = CONSTANTS.intArray.length + 1;
      const table = MultiplicationTableGenerator.multiplicationTable(CONSTANTS.intArray);
      assert.equal(table.length, tableSize);
      for (let i = 0; i < table.length; i++) {
        assert.equal(table[i].length, tableSize);
      }
    },
    shouldReturnTableWithFactors: () => {
      const table = MultiplicationTableGenerator.multiplicationTable(CONSTANTS.intArray);
      assert.equal(table[0][0], '', 'Table[0,0] should be blank.');
      for(let i = 0; i < CONSTANTS.intArray.length; i++) {
        assert.equal(table[0][i+1], CONSTANTS.intArray[i], 'Table Row has an unexpected factor.');
        assert.equal(table[i+1][0], CONSTANTS.intArray[i], 'Table Column has an unexpected factor.');
      }
    },
    shouldReturnTableWithMultiples: () => {
      const table = MultiplicationTableGenerator.multiplicationTable(CONSTANTS.intArray);
      const matrix = MultiplicationTableGenerator.multiplicationMatrix(CONSTANTS.intArray);

      let values;
      for(let i = 0; i < matrix.length; i++) {
        values = matrix[i];
        for(let j = 0; j < values.length; j++) {
          assert.equal(matrix[i][j], table[i+1][j+1], `Table[${i+1},${j+1}] doesn't match Matrix[${i},${j}].`);
        }
      }
    }
  }
}

const describeMultiplicationMatrix = () => {
  it('should return an empty array, if provided an empty array', multiplicationMatrix.it.shouldReturnEmptyArray);
  it('should return a 2-dimensional array, if provided an array of values', multiplicationMatrix.it.shouldReturn2DArray);
  it('should return a matrix of multiples of the provided array of integers', multiplicationMatrix.it.shouldReturnMultiplicationMatrix);
};

const describeMultiplicationTable = () => {
  it('should return an empty array, if provided an empty array', multiplicationTable.it.shouldReturnEmptyArray);
  it('should return a matrix one greater than the size of the provided array', multiplicationTable.it.shouldReturnAMatrixOneGreater);
  it('should return a table with a factors row and column added', multiplicationTable.it.shouldReturnTableWithFactors);
  it('should return a table with the multiples provided by the matrix', multiplicationTable.it.shouldReturnTableWithMultiples);
};


const describeMutliplicationTableGenerator = () => {
  describe('#multiplicationMatrix()', describeMultiplicationMatrix);
  describe('#multiplicationTable()', describeMultiplicationTable);
};

describe('MultiplicationTableGenerator', describeMutliplicationTableGenerator);