import { trimOverkill } from './trimOverkill'

/**
 * Converts a BigInt value to a floating-point number with specified decimal precision.
 *
 * @param {BigInt} bigIntVal - The BigInt value to be converted.
 * @param {number} exponent - The exponent that determines the scale of the division.
 * @param {number} [dec=exponent] - The number of decimal places for trimming the result.
 * @returns {number} - The converted and trimmed floating-point number.
 */
export const toMacroUnits = (bigIntVal, exponent, dec = exponent) => {
	return trimOverkill(Number(bigIntVal) / Math.pow(10, exponent), dec)
}
