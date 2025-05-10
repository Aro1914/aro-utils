/**
 * Asynchronously filters an array using a predicate function that returns a Promise
 * @param {Array} arr - The array to filter
 * @param {Function} predicate - Async function that returns a Promise resolving to boolean
 * @returns {Promise<Array>} A Promise that resolves to the filtered array
 * @example
 * const numbers = [1, 2, 3, 4, 5];
 * const isEvenAsync = async (num) => num % 2 === 0;
 * const evenNumbers = await asyncFilter(numbers, isEvenAsync);
 */
export async function asyncFilter(arr, predicate) {
	const results = await Promise.all(
		arr.map(async (item) => ({
			item,
			result: await predicate(item),
		}))
	)
	return results.filter(({ result }) => result).map(({ item }) => item)
}
