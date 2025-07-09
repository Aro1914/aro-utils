import { getASAInfo } from './tokenUtils'

/**
 * Converts a given amount of a token to its corresponding integer representation.
 * @param {number} tok - The ASA ID of the token.
 * @param {number} amt - The amount of the token to be parsed.
 * @param {number} [dec=null] - The number of decimal places to round to. If not
 * provided, the default from the token configuration is used.
 * @returns {number} - The parsed amount.
 */
export const parseCurrency = async (tok, amt, dec = null) => {
	const { decimals = 0 } =
		dec !== null ? { decimals: dec } : await getASAInfo(tok)
	const power = 10 ** Number(decimals)
	const newAmt = amt * power
	const secondHalf = String(newAmt % 1).length - 2
	if (secondHalf) {
		return Math.ceil(newAmt)
	}
	return Number(newAmt)
}
