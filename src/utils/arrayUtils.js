/**
 * Fills an array to a specified size by repeating its elements cyclically
 * @param {Array} array - The source array to be filled from
 * @param {number} size - The target size of the resulting array
 * @returns {Array} A new array of the specified size filled with cyclically repeated elements from the source array
 * @example
 * fillArray([1,2], 5) // returns [1,2,1,2,1]
 * fillArray([1], 3) // returns [1,1,1]
 * fillArray([], 3) // returns []
 * fillArray([1,2], 0) // returns []
 */
export const fillArray = (array, size) => {
	if (!array?.length || !size) return []
	if (array?.length >= size) return array
	const newArray = []

	let i = 0
	for (i; i < size; i++) {
		newArray.push(array[i % array.length])
	}

	return newArray
}


/**
 * Takes an array and duplicates its elements, appending them to the end of the array a specified number of times.
 * @param {Array} array - The input array to be padded
 * @param {number} padTimes - The number of times to pad (duplicate) elements from the start of the array
 * @returns {Array} A new array with the padded elements. Returns empty array if input array is empty/null/undefined or if padTimes is falsy
 * @example
 * padArray([1,2,3], 2) // returns [1,2,3,1,2]
 * padArray([1], 3) // returns [1,1,1,1]
 * padArray([], 2) // returns []
 * padArray(null, 2) // returns []
 */
export const padArray = (array, padTimes) => {
	if (!array?.length || !padTimes) return []
	const newArray = [...array]
	let i = 0
	for (i; i < padTimes; i++) {
		newArray.push(newArray[i])
	}

	return newArray
}

/**
 * Merges and validates two arrays of objects based on a specified property,
 * prioritizing the data from the new array while maintaining items from the previous array
 * that are still present in the new data.
 *
 * @param {Array} prevData - The previous array of objects to merge from
 * @param {Array} newData - The new array of objects to merge with
 * @param {string} prop - The property name to use as a unique identifier for merging
 * @returns {Array} A merged array containing validated items from both arrays
 *
 * @example
 * const prev = [{id: 1, name: 'old'}, {id: 2, name: 'keep'}];
 * const next = [{id: 2, name: 'keep'}, {id: 3, name: 'new'}];
 * validateAndMerge(prev, next, 'id');
 * // Returns [{id: 2, name: 'keep'}, {id: 3, name: 'new'}]
 */
export const validateAndMerge = (prevData, newData, prop) => {
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
 * Merges two arrays of objects, filtering out duplicates based on a specified property.
 * The function preserves newer items when duplicates are found.
 *
 * @param {Array} prevData - The original array of objects
 * @param {Array} newData - The new array of objects to merge with the original
 * @param {string} prop - The property name to use for identifying duplicates
 * @returns {Array} A new array containing merged data with duplicates removed
 * 
 * @example
 * const prev = [{id: 1, name: 'John'}, {id: 2, name: 'Jane'}];
 * const new = [{id: 2, name: 'Janet'}, {id: 3, name: 'Bob'}];
 * validateAndMergeWithOld(prev, new, 'id');
 * // Returns [{id: 1, name: 'John'}, {id: 2, name: 'Janet'}, {id: 3, name: 'Bob'}]
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
