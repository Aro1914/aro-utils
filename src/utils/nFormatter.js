import { trimOverkill } from './trimOverkill'

/**
 * Formats a number with metric suffixes (K, M, B, T, P, E) based on its magnitude.
 * @param {number} num - The number to format
 * @param {number} [digits=0] - Number of decimal places to show
 * @param {number} [depth=1] - Minimum magnitude threshold for formatting (1 for all, 1000 for K+, 1000000 for M+, etc)
 * @param {boolean} [trim=false] - Whether to trim trailing zeros after decimal point when number equals depth threshold
 * @returns {string} The formatted number with appropriate metric suffix
 * @example
 * nFormatter(1234, 1) // returns "1.2K"
 * nFormatter(1234, 0, 1000000) // returns 1234 (below M threshold)
 * nFormatter(1234000, 2) // returns "1.23M"
 */
export function nFormatter(num, digits = 0, depth = 1, trim = false) {
	num = trimOverkill(num, digits)
	const lookup = [
		{ value: 1, symbol: '' },
		{ value: 1e3, symbol: 'K' },
		{ value: 1e6, symbol: 'M' },
		{ value: 1e9, symbol: 'B' },
		{ value: 1e12, symbol: 'T' },
		{ value: 1e15, symbol: 'P' },
		{ value: 1e18, symbol: 'E' },
	]
	const size = {
		'': 0,
		['1000']: 3,
		['1000000']: 6,
		['1000000000']: 9,
		['1000000000000']: 12,
		['1000000000000000']: 15,
		['1000000000000000000']: 18,
	}
	const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/
	const item = lookup.findLast((item) => num >= item.value && num >= depth)
	return item
		? (num / item.value)
				.toFixed(digits)
				.replace(regexp, '')
				.concat(item?.symbol)
		: String(Math.floor(num)).length === size[depth] && trim
		? trimOverkill(num, 1)
		: num
}
