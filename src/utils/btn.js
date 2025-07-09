/**
 * Convert a BigInt to a Number, throwing if it's outside the safe range.
 *
 * The safe range is defined as [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER].
 *
 * @throws {RangeError} if the BigInt is outside the safe range.
 *
 * @param {BigInt} bi - the BigInt to convert.
 *
 * @returns {number} the converted Number.
 */
export function bigintToSafeNumber(bi) {
	const max = BigInt(Number.MAX_SAFE_INTEGER)
	const min = BigInt(Number.MIN_SAFE_INTEGER)

	if (bi > max || bi < min) {
		throw new RangeError(`BigInt ${bi} is outside safe Number range`)
	}

	return Number(bi)
}
