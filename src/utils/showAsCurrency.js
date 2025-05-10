import { currencyFormat } from './currencyFormat'
import { trimOverkill } from './trimOverkill'
import { nFormatter } from './nFormatter'

/**
 * Formats a numeric value as a currency string based on provided parameters.
 * Depending on the value and parameters, it either trims the value or formats it
 * using a larger unit notation (e.g., K for thousands, M for millions).
 *
 * @param {number} val - The value to be formatted.
 * @param {number} digits - Number of decimal places to include.
 * @param {number} depth - A threshold value that determines when to format with larger units.
 * @param {boolean} blankDecimals - Whether to add blank decimals.
 * @param {boolean} trim - Whether to trim trailing zeros from the value.
 * @returns {string} - The formatted currency string.
 */
export function showAsCurrency({
	val = 0,
	digits = 0,
	depth = 1e6,
	blankDecimals = false,
	trim = false,
}) {
	const f =
		val < 1
			? trimOverkill(val ?? 0, digits)
			: nFormatter(val, digits, depth, trim)

	const c = isNaN(f)
		? f
		: f >= 1
		? currencyFormat(f, blankDecimals, digits)
		: trimOverkill(f, digits)

	return c
}
