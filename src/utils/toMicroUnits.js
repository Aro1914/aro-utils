import { trimOverkill } from "./trimOverkill";

/**
 * Converts a floating-point number to its micro units representation as a BigInt.
 *
 * The function trims the input number to a specified number of decimal places
 * and converts it to a string for manipulation. It separates the number into
 * integer and fractional parts, calculates the shift based on the exponent,
 * and constructs a final string for conversion to BigInt. Handles both positive
 * and negative numbers.
 *
 * @param {number} num - The number to be converted to micro units.
 * @param {number} exponent - The exponent indicating the number of decimal places
 *                            to consider for the conversion.
 * @returns {BigInt} - The micro units representation of the number.
 * @throws {TypeError} - If either argument is not a number.
 */
export const toMicroUnits = (num, exponent) => {
	if (typeof num !== 'number' || typeof exponent !== 'number') {
		throw new TypeError('Both arguments must be numbers')
	}

	// Step 1: Trim the number using your smart logic
	const trimmed = trimOverkill(num, exponent)

	// Step 2: Convert to string for safe manipulation
	const numStr = trimmed.toExponential().includes('e')
		? trimmed.toFixed(20)
		: trimmed.toString()

	// Step 3: Split into integer and fractional parts
	const [intPartRaw, fracPartRaw = ''] = numStr.split('.')
	const intPart = intPartRaw.replace(/^0+(?!$)/, '') || '0'
	const fracPart = fracPartRaw.replace(/0+$/, '')

	// Step 4: Build raw digits string (integer + fractional)
	const raw = intPart + fracPart

	// Step 5: Calculate total shift needed
	const fractionDigits = fracPart.length
	const totalShift = exponent - fractionDigits

	// Step 6: Build final string for BigInt
	let finalStr
	if (totalShift < 0) {
		// Need to truncate raw string
		finalStr = raw.slice(0, raw.length + totalShift) || '0'
	} else {
		// Pad with zeros
		finalStr = raw + '0'.repeat(totalShift)
	}

	// Step 7: Handle negatives
	return BigInt(trimmed < 0 ? `-${finalStr}` : finalStr)
}
