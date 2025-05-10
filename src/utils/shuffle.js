/**
 * Shuffles an array and optionally returns a subset of shuffled elements.
 * @param {Array} array - The array to shuffle.
 * @param {number} [returnAmount] - The number of elements to return after shuffling. If not provided, returns all elements.
 * @returns {Array} A new array containing the shuffled elements.
 * @throws {Error} If the input is not an array.
 * @example
 * // Returns completely shuffled array
 * shuffle([1, 2, 3, 4, 5]);
 * 
 * // Returns 3 randomly selected and shuffled elements
 * shuffle([1, 2, 3, 4, 5], 3);
 */
export const shuffle = (array, returnAmount) => {
	if (!returnAmount && array?.length) returnAmount = array?.length
	const returnRandomSection = (arr, step) => {
		if (!arr || !step) return arr
		step = arr.length < step ? arr.length : step
		const len = arr.length
		const points = Math.floor(len / step)
		const remainder = len % step
		let i = 0
		const indices = []
		while (i <= points) {
			indices.push(i * step)
			i++
		}
		const index = Math.floor(Math.random(points) * indices.length)
		const start =
			indices[index] === points * step && !remainder
				? indices[index - 1]
				: indices[index] === points * step && remainder
				? indices[index] - (step - remainder)
				: indices[index]

		const stop =
			indices[index] === points * step && remainder
				? indices[index] + remainder
				: start + step
		let x = start
		const ret = []
		while (x < stop) {
			ret.push(arr[x])
			x++
		}

		return ret
	}

	const randomize = (arr = []) => {
		let i = 0
		const array = arr,
			ret = [],
			getLength = () => array.length,
			len = getLength(),
			getIndex = () => Math.floor(Math.random(getLength() - 1) * getLength())
		while (i < len) {
			const index = getIndex()
			ret.push(array.splice(index, 1)[0])
			i++
		}
		return ret
	}

	return returnRandomSection(randomize(array), returnAmount)
}
