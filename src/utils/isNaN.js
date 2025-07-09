/**
 * Determines whether the provided value is considered NaN (Not-a-Number) or an invalid number-like value.
 *
 * Returns true if the value is:
 * - NaN (using Number.isNaN)
 * - null
 * - undefined
 * - an empty string
 * - the string 'NaN'
 * - the string 'null'
 * - the string 'undefined'
 * Returns false for BigInt values.
 *
 * @param {*} num - The value to check.
 * @returns {boolean} True if the value is considered NaN or invalid, false otherwise.
 */
export const isNaN = (num) =>
	typeof num === 'bigint'
		? false
		: num === null ||
		  num === undefined ||
		  num === 'NaN' ||
		  num === 'null' ||
		  num === 'undefined' ||
		  Number.isNaN(Number(num))
