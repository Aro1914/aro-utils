
/**
 * Converts a number of days into a human-readable duration string.
 * @param {number} days - The number of days to convert.
 * @returns {string} A formatted string representing the duration in Days, Weeks, Months, or Years.
 * @example
 * getDuration(1) // returns "1 Day"
 * getDuration(14) // returns "2 Weeks"
 * getDuration(60) // returns "2 Months"
 * getDuration(730) // returns "2 Years"
 * getDuration(0.5) // returns "Less than a Day"
 */
export const getDuration = (days) => {
	if (days < 1) return `Less than a Day`
	const durations = [
		{ value: 1, symbol: 'Day' },
		{ value: 7, symbol: 'Week' },
		{ value: 30, symbol: 'Month' },
		{ value: 356, symbol: 'Year' },
	]
	const duration = durations.findLast((duration) => days >= duration.value)
	const period = Math.round(Number(days) / duration.value)
	const returningPeriod = `${period} ${duration.symbol}${period > 1 ? 's' : ''}`
	return returningPeriod
}
