export function bigintToSafeNumber(bi) {
	const max = BigInt(Number.MAX_SAFE_INTEGER)
	const min = BigInt(Number.MIN_SAFE_INTEGER)

	if (bi > max || bi < min) {
		throw new RangeError(`BigInt ${bi} is outside safe Number range`)
	}

	return Number(bi)
}
