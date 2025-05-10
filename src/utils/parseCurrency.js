import { getASAInfo } from './tokenUtils'

/**
 * Parses currency amounts by adjusting for decimal places.
 * 
 * @param {(number|string)} tok - The token/asset ID to process
 * @param {number} amt - The amount to be parsed
 * @param {number|null} [dec=null] - Optional decimal places override
 * @returns {Promise<number>} The parsed amount adjusted for decimals
 * @async
 * 
 * @example
 * // With decimal override
 * const result1 = await parseCurrency(123456, 1.5, 6);
 * // result1: 1500000
 * 
 * @example
 * // Without decimal override (fetches decimals from ASA info)
 * const result2 = await parseCurrency(123456, 1.5);
 * // result2: depends on ASA decimals
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
