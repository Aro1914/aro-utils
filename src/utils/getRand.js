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
