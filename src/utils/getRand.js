/**
 * Generates a random number within specified bounds and multiplies by a factor
 * @param {Object} options - Configuration options
 * @param {number} [options.range=3] - The range of random numbers
 * @param {number} [options.lowerBound=0] - The lower bound
 * @param {number} [options.upperBound=1] - The upper bound
 * @param {number} [options.multiple=1000] - Multiplication factor
 * @returns {number} The generated random number
 */
export const getRand = ({
	range = 3,
	lowerBound = 0,
	upperBound = 1,
	multiple = 1000,
} = {}) =>
	Math.floor(
		(range > upperBound - lowerBound ? lowerBound + range : upperBound) -
			((lowerBound > upperBound ? upperBound : lowerBound) +
				Math.random() * range)
	) * multiple
