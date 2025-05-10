/**
 * Unified method with format options
 * This combines the reliability of the math method with formatting options
 *
 * @param {number} num - The input number to be reduced
 * @param {object} options - Formatting options
 * @returns {object|string} Result based on format option
 */
export function reduceNumber(num, options = {}) {
	const defaultOptions = {
		format: 'object', // 'object', 'string', 'scientific'
		stringTemplate: '{reduced} × 10^{power}',
		scientific: false, // If true, returns in scientific notation
		detectOnly: false, // If true, only detects if it's a multiple of 10
	}

	const opts = { ...defaultOptions, ...options }

	// Use the mathematical approach for reduction
	let n = Math.round(num)
	let powerOf10 = 0

	while (n % 10 === 0 && n !== 0) {
		n /= 10
		powerOf10++
	}

	const result = {
		original: num,
		reduced: n,
		powerOf10: powerOf10,
		isMultipleOf10: powerOf10 > 0,
	}

	// Return based on format option
	if (opts.detectOnly) {
		return result.isMultipleOf10
	}

	if (opts.format === 'string') {
		return opts.stringTemplate
			.replace('{reduced}', result.reduced)
			.replace('{power}', result.powerOf10)
			.replace('{original}', result.original)
	}

	if (opts.format === 'scientific' || opts.scientific) {
		return `${result.reduced}e${result.powerOf10}`
	}

	return result
}

export const trimOverkill = (el, dec = 2) => {
	if (el === 0) return el
	if (dec === 0) return Math.round(trimOverkill(el, 1))
	const el_ = el
	const dpIsSmall = el_ < 1e-6
	const dp_ = dpIsSmall
		? el_
		: String(el_).includes('.')
		? String(el_).slice(String(el_).indexOf('.') + 1)
		: ''
	let dpToUse = dp_
	if (dpIsSmall) {
		const scientificStr = Number(dp_).toExponential(20) // High precision
		const [mantissa_, exponent_] = scientificStr.split('e')
		const absExponent = Math.abs(exponent_)
		const exponentValue = parseInt(exponent_, 10)
		const leadingZerosCount = Math.abs(exponentValue) - 1
		const dPart = el.toString().split('e')[0].replace('.', '')
		const scaleFactor = Math.pow(10, leadingZerosCount + dPart.length)
		const scaledValue = dp_ * scaleFactor
		const reduced = trimOverkill(
			Number(
				'0.' +
					(reduceNumber(trimOverkill(scaledValue, 0))?.reduced ?? scaledValue)
			),
			dec > dPart.length ? dPart.length : dec
		)
			.toString()
			.slice(2)
		const dpMin =
			'0'.repeat(absExponent - (absExponent >= 1 ? 1 : 0)) + reduced.toString()

		dpToUse = dpMin
	}
	const dpLen = dpToUse?.length
	dpToUse
	if (dpIsSmall || (dec > dpLen && dpLen && !isNaN(dpToUse))) {
		const original = dpToUse
			.split('')
			.reverse()
			.map((el) => Number(el))
		original.reduce((i, el, x) => {
			el = Number(el)
			el
			if ((i ?? 0) > 4 && el === 9) {
				original[x] = 0
				return -1
			} else if (i === -1) {
				if (el === 9) {
					original[x] = 0
					return -1
				} else {
					original[x] = el + 1
					return el
				}
			}
		}, 0)
		const dp = original.reverse().join('')
		const ret = (
			dpIsSmall ? '0.' : String(el_).slice(0, String(el_).indexOf('.') + 1)
		).concat(dp)
		return Number(ret)
	} else if (!dpLen) {
		return el_
	}

	let strDp = '0.'.concat(dp_)
	if (el_ < 0) strDp = '-'.concat(strDp)
	if (strDp.includes('e-')) {
		const count = Number(strDp.slice(strDp.lastIndexOf('-') + 1)) - 1
		const x = strDp.split('')
		const valid = x
			.filter((el) => !isNaN(el))
			.map((el) => Number(el))
			.join('')
		strDp = '0'.repeat(count).concat(valid)
		strDp = '0.'.concat(strDp)
		if (el < 0) strDp = '-'.concat(strDp)
	}
	const dP1 = dec + (el_ > 0 ? 1 : 2),
		dP2 = dec + (el_ > 0 ? 2 : 3)
	const strDPLen = strDp.length
	const sSDP1 = Number(strDp[dP1])
	let original = []
	let snap = []
	let newArray = []
	let sSDP2 = 0
	if (strDPLen > dP2) {
		const excess = strDp.slice(dP2 + 1).split('')
		const fS = excess.findIndex((el) => Number(el) <= 3)
		const wrap = excess.slice(0, fS === -1 ? undefined : fS).reverse()
		const increment = wrap.reduce((increment, thisElement) => {
			const resolved = Number(increment) + Number(thisElement)
			return resolved > 4 ? 1 : 0
		}, 0)
		sSDP2 = Number(strDp[dP2]) + increment
		const oFS = strDp.indexOf('.')
		original = strDp
			.slice(oFS + 1, dP2)
			.split('')
			.reverse()
		snap = original.map((el) => Number(el))
		snap.reverse()
		newArray = []
		if (sSDP2 > 4) {
			if (sSDP1 === 9) {
				original.reduce((i, el, x) => {
					el = Number(el)
					if (i > 4 && el === 9) {
						original[x] = 0
						newArray.unshift(0)
						return -1
					} else if (i === -1) {
						if (el === 9) {
							original[x] = 0
							newArray.unshift(0)
							return -1
						} else {
							original[x] = el + 1
							newArray.unshift(el + 1)
							return el
						}
					}
				}, sSDP2)
			} else {
				original[0] = Number(original[0]) + 1
			}
		}
		original.reverse()
		if (sSDP1 === sSDP2) {
			strDp = strDp
				.substring(0, dP1)
				.concat(Number(sSDP2) > 4 ? Number(sSDP1) + 1 : sSDP1)
		} else if (sSDP2 > sSDP1) {
			let string = strDp
				.slice(0, dP1)
				.concat(Number(sSDP1) + (sSDP2 > 4 ? 1 : 0))
			strDp = string
		}
	} else {
		original = dp_.split('').map((el) => Number(el))
		newArray = [...original]
		snap = [...original]
	}
	let str = String(el_).slice(0, String(el_).indexOf('.'))
	const addOne =
		sSDP2 > 4 && snap?.length ? snap.every((el) => Number(el) === 9) : false
	str = String(Number(str) + (addOne ? (el < 0 ? -1 : 1) : 0))
	const allZeroes = newArray?.length
		? newArray.every((el) => Number(el) === 0)
		: false
	const dp = allZeroes ? '' : '.'.concat(original.join(''))
	str += dp
	const returnValue =
		el_ < 0 && Number.isInteger(el_) ? Number(str) * -1 : Number(str)
	return returnValue
}
