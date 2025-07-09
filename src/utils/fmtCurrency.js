import { getASAInfo } from './tokenUtils'

/**
 * Formats a given amount of a token to its corresponding decimal representation.
 * @param {number} tok - The ASA ID of the token.
 * @param {number} amt - The amount of the token to be formatted.
 * @param {number} [dec=null] - The number of decimal places to round to. If not
 * provided, the default from the token configuration is used.
 * @returns {number} - The formatted amount.
 */
export const fmtCurrency = async (tok, amt, dec = null) => {
	const { decimals = 0 } =
		dec !== null ? { decimals: dec } : await getASAInfo(tok)
	const power = 10 ** Number(decimals)
	const newAmt = amt / power
	return Number(newAmt)
}
