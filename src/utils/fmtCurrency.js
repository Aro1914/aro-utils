import { getASAInfo } from './tokenUtils'

/**
 * Formats a currency amount based on the token's decimal places
 * @param {number|string} tok - The token ID
 * @param {number} amt - The amount to format
 * @param {number|null} dec - Optional override for decimal places
 * @returns {Promise<number>} The formatted amount
 * @example
 * const formattedAmount = await fmtCurrency(123456, 1000000, 6); // 1.0
 */
export const fmtCurrency = async (tok, amt, dec = null) => {
	const { decimals = 0 } =
		dec !== null ? { decimals: dec } : await getASAInfo(tok)
	const power = 10 ** Number(decimals)
	const newAmt = amt / power
	return Number(newAmt)
}
