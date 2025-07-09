import { reduceNumber, trimOverkill } from './trimOverkill'
import { isNaN } from './isNaN'


/**
 * Format a number as currency with support for abbreviated large numbers
 * and special formatting for very small decimals
 *
 * @param {Number} value - The number to format
 * @param {Number} depth - The threshold for abbreviation (default: 1e6)
 * @param {Number} dp - Number of decimal places (default: 2)
 * @param {Boolean} includeBlankDecimals - Include .00 for whole numbers (default: false)
 * @param {Boolean} trim - Trim decimal places for large numbers (default: false)
 * @returns {String} Formatted currency string
 */
export function formatAsCurrency({
	value = 0,
	depth = 1e6,
	dp = 2,
	includeBlankDecimals = false,
	trim = false,
}) {
	// Return value as is if cannot be cast to a valid number
	if (isNaN(value)) {
		return value
	}
	value = Number(value)
	const scientificStr = value.toExponential(20) // High precision
	const [mantissa_, exponent_] = scientificStr.split('e')
	const absExponent = Math.abs(exponent_)
	const dpMin = Number(
		'0.' + '0'.repeat(absExponent - (absExponent >= 2 ? 2 : 0)) + '1'
	)
	// Handle small decimal values with many leading zeros
	if (
		value > 0 &&
		absExponent >= (absExponent <= 4 ? 4 : dp) &&
		value < dpMin
	) {
		// Use scientific notation to get the exact precision
		const exponentValue = parseInt(exponent_, 10)

		if (exponentValue < 0) {
			// Due to floating point precision issues, we need to detect these cases
			// Calculate leading zeros count after decimal point

			const leadingZerosCount = Math.abs(exponentValue) - 1

			// For very small numbers, precisely determine the significant digits
			// Multiply by 10^(leadingZeros+dp) to position decimal point correctly for rounding
			const scaleFactor = Math.pow(10, leadingZerosCount + dp)
			const scaledValue = value * scaleFactor
			const reduced = reduceNumber(scaledValue)?.reduced ?? scaledValue
			const roundedMantissa = trimOverkill(reduced, 0)
			const significantDigits = roundedMantissa.toString().substring(0, dp)
			// Format the result with {n} indicating the count of zeros
			return `0.0{${leadingZerosCount}}${significantDigits}`
		}
	}

	// Define the size of each suffix
	const size = {
		'': 0,
		['1000']: 3,
		['1000000']: 6,
		['1000000000']: 9,
		['1000000000000']: 12,
		['1000000000000000']: 15,
		['1000000000000000000']: 18,
	}

	const absValue = Math.abs(value)
	let exponent = 0
	let suffix = ''

	// Apply trim logic for large numbers near threshold
	let effectiveDp = dp
	if (trim && dp != 0 && String(Math.floor(absValue)).length >= size[depth]) {
		effectiveDp = 1 // Reduce to 1 decimal place
	}

	// Determine the exponent (depth) and corresponding suffix

	if (absValue >= depth) {
		const lookup = [
			{ value: 1, symbol: '' },
			{ value: 1e3, symbol: 'K' },
			{ value: 1e6, symbol: 'M' },
			{ value: 1e9, symbol: 'B' },
			{ value: 1e12, symbol: 'T' },
			{ value: 1e15, symbol: 'P' },
			{ value: 1e18, symbol: 'E' },
		]
		const trimmedValue = trimOverkill(value, effectiveDp)
		const item = lookup.findLast(
			(item) => trimmedValue >= item.value && trimmedValue >= depth
		)
		suffix = item?.symbol || ''
		const depthExp = Math.floor(Math.log10(item.value))
		exponent = depthExp
	}
	// Scale the value according to the exponent
	const scaledValue = exponent > 0 ? value / Math.pow(10, exponent) : value
	// Format the number with appropriate decimal places
	let formatted
	if (
		effectiveDp === 0 ||
		(!includeBlankDecimals && Number.isInteger(scaledValue))
	) {
		// No decimal places needed
		formatted = trimOverkill(scaledValue, 0).toLocaleString()
	} else {
		// Format with specified decimal places
		formatted = trimOverkill(
			scaledValue,
			trim ? dp : effectiveDp
		).toLocaleString(undefined, {
			minimumFractionDigits: includeBlankDecimals ? effectiveDp : 0,
			maximumFractionDigits: trim ? dp : effectiveDp,
		})
	}

	// Append the suffix
	return formatted + suffix
}
