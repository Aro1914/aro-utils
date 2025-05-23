import { reduceNumber, trimOverkill } from './trimOverkill'

/**
 * Formats a number as a currency string with optional suffixes for large numbers.
 * @param {Object} params - The parameters for formatting
 * @param {number} [params.value=0] - The number to format
 * @param {number} [params.depth=1e6] - The threshold at which to start using suffixes (K,M,B,etc)
 * @param {number} [params.dp=2] - The number of decimal places to show
 * @param {boolean} [params.includeBlankDecimals=false] - Whether to show trailing zeros in decimals
 * @param {boolean} [params.trim=true] - Whether to reduce decimal places for large numbers
 * @param {string} [params.symbol=''] - The currency symbol to prepend (single character only)
 * @returns {string} The formatted currency string
 * @example
 * formatAsCurrency({ value: 1234567, symbol: '$' }) // Returns "$1.2M"
 * formatAsCurrency({ value: 1234.56, dp: 2, symbol: '€' }) // Returns "€1,234.56"
 * formatAsCurrency({ value: 1000000, depth: 1e9 }) // Returns "1,000,000"
 */
export function formatAsCurrency({
	value = 0,
	depth = 1e6,
	dp = 2,
	includeBlankDecimals = false,
	trim = true,
	symbol = '', // '$' or '€'
}) {
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
	if (
		value > 0 &&
		absExponent >= (absExponent <= 4 ? 4 : dp) &&
		value < dpMin
	) {
		const exponentValue = parseInt(exponent_, 10)

		if (exponentValue < 0) {
			const leadingZerosCount = Math.abs(exponentValue) - 1

			const scaleFactor = Math.pow(10, leadingZerosCount + dp)
			const scaledValue = value * scaleFactor
			const reduced = reduceNumber(scaledValue)?.reduced ?? scaledValue
			const roundedMantissa = trimOverkill(reduced, 0)
			const significantDigits = roundedMantissa.toString().substring(0, dp)

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

	let effectiveDp = dp

	if (trim && dp != 0 && String(Math.floor(absValue)).length >= size[depth]) {
		effectiveDp = 1 // Reduce to 1 decimal place
	}

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

	const scaledValue = exponent > 0 ? value / Math.pow(10, exponent) : value

	let formatted
	if (
		effectiveDp === 0 ||
		(!includeBlankDecimals && Number.isInteger(scaledValue))
	) {
		formatted = trimOverkill(scaledValue, 0).toLocaleString()
	} else {
		formatted = trimOverkill(
			scaledValue,
			trim ? dp : effectiveDp
		).toLocaleString(undefined, {
			minimumFractionDigits: includeBlankDecimals ? effectiveDp : 0,
			maximumFractionDigits: effectiveDp,
		})
	}

	return (
		(symbol && typeof symbol === 'string' && symbol.length === 1
			? symbol
			: '') +
		formatted +
		suffix
	)
}
