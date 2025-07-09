/**
 * Asynchronously filters an array using a predicate function that returns a Promise.
 * @param {Array} arr - The array of items to process.
 * @param {function} predicate - The function to call for each item. Must return a promise.
 * @returns {Promise<Array>} A promise that resolves to an array of results from the predicate function.
 * @example
 * const array = [1, 2, 3, 4, 5]
 *
 * async function isEven(num) {
 * 	return new Promise((resolve) => {
 * 		setTimeout(() => resolve(num % 2 === 0), 100)
 * 	})
 * }
 *
 * const evenNumbers = await asyncFilter(array, isEven)
 * // evenNumbers = [2, 4]
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
