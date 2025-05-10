/**
 * Trims a number to a specified number of decimal places using custom rounding logic
 * @param {number} el - The number to trim
 * @param {number} [dec=2] - The number of decimal places to trim to (default: 2)
 * @returns {number} The trimmed number
 * 
 * @example
 * customTrim(3.14159, 2) // returns 3.14
 * customTrim(3.14159, 0) // returns 3
 * customTrim(-3.14159, 2) // returns -3.14
 * customTrim(0, 2) // returns 0
 */
export const customTrim = (el, dec = 2) => {
	if (el === 0) return el
	if (dec === 0) return Math.round(el)
	const el_ = el
	let strDp = String(+(Math.round((el_ % 1) + `e+${dec}`) + `e-${dec}`))
	if (el_ < 0) strDp = String((strDp *= -1))
	const _ = dec + 2,
		__ = dec + 1,
		___ = dec ? dec * 2 : 1
	if (el_ > 0) {
		if (strDp.length > _)
			if (strDp[__] === strDp[_]) {
				strDp = strDp.substring(0, _)
			} else if (strDp[_] > __) {
				strDp[__] = strDp[__] + 1
				strDp = strDp.substring(0, _)
			}
	} else if (strDp.length > ___) {
		if (strDp[_] === strDp[___]) strDp = strDp.substring(0, ___)
		else if (strDp[___] > 4) {
			strDp[_] = strDp[_] + 1
			strDp = strDp.substring(0, ___)
		}
	}
	let str = String(
		el_ - (el_ % 1) + Number(strDp.substring(0, el_ < 0 ? 2 : 1))
	)
	str += strDp.substring(1, ___)
	return el_ < 0 && el_ - (el_ % 1) === 0 ? Number(str) * -1 : Number(str)
}
