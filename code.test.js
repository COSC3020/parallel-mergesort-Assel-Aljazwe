const assert = require('assert');
const mergeSort = require('./code');

(async () => {
  const unsortedArray = [3, 1, 4, 1, 5, 9, 2, 6];
  const sortedArray = await mergeSort(unsortedArray);
  assert.deepStrictEqual(sortedArray, [1, 1, 2, 3, 4, 5, 6, 9], 'The array was not sorted correctly.');

  console.log('All tests passed!');
})().catch(error => {
  console.error('Some tests failed.');
  console.error(error);
  process.exit(1);
});
