/**
 * Creates a new array by repeating elements from the input array until reaching the specified size
 * @param {Array} array - The source array to fill from
 * @param {number} size - The desired size of the resulting array
 * @returns {Array} A new array of the specified size filled with repeated elements from the input array
 * @example
 * fillArray([1,2], 5) // returns [1,2,1,2,1]
 * fillArray([1], 3) // returns [1,1,1]  
 * fillArray([], 3) // returns []
 * fillArray([1,2], 0) // returns []
 */
	const updatedSet = new Map()

	newData.forEach((item) => updatedSet.set(item?.[prop], item))

	prevData.forEach((item) => {
		if (updatedSet.has(item?.[prop])) {
			updatedSet.set(item?.[prop], item)
		}
	})

	return Array.from(updatedSet.values())
}

/**
 * Merges new data with previous data, ensuring no duplicates based on a specified property.
 *
 * @param {Array<Object>} prevData - The previous data array.
 * @param {Array<Object>} newData - The new data array to be merged.
 * @param {string} prop - The property name used to identify duplicates.
 * @returns {Array<Object>} - The merged array with unique items based on the specified property.
 */
export const validateAndMergeWithOld = (prevData, newData, prop) => {
	const mergedData = [
		...prevData.filter(
			(item) => !newData.some((prevItem) => prevItem?.[prop] === item?.[prop])
		),
		...newData,
	]

	return mergedData
}

/**
 * Sorts an array of strings alphanumerically using natural sort order
 * @param {string[]} array - The array of strings to be sorted
 * @returns {string[]} The sorted array
 * @example
 * sortArrayAlphaNumerically(['item1', 'item10', 'item2'])
 * // returns ['item1', 'item2', 'item10']
 */
export const sortArrayAlphaNumerically = (array) => {
	const sortAlphaNum = (a, b) => a.localeCompare(b, 'en', { numeric: true })
	return array.sort(sortAlphaNum)
}
