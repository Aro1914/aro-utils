import { trimOverkill } from './trimOverkill'

/**
 * Formats a given number to a nice, short, human-readable string, with metric
 * suffixes for large numbers.
 *
 * @param {number} num - The number to format.
 * @param {number} [digits=0] - The number of decimal places to include.
 * @param {number} [depth=1] - A threshold value that determines when to format
 *   with larger units.
 * @param {boolean} [trim=false] - Whether to trim trailing zeros from the value.
 * @returns {string} The formatted string.
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
		: String(typeof num === 'bigint' ? num : Math.floor(num)).length ===
				size[depth] && trim
		? trimOverkill(num, 1)
		: num
}
