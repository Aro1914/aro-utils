import { trimOverkill } from './trimOverkill'

/**
 * Formats a number into a currency string representation with customizable decimal places and comma separators.
 * @param {number} _n - The number to format
 * @param {boolean} [_ad=true] - Flag to determine if '.00' should be added when no decimals exist
 * @param {number} [_d=2] - Number of decimal places to maintain
 * @returns {string} The formatted currency string
 * @example
 * currencyFormat(1234567.89) // returns "1,234,567.89"
 * currencyFormat(1234567) // returns "1,234,567.00"
 * currencyFormat(1234567.89, false) // returns "1,234,567.89"
 * currencyFormat(1234567, false) // returns "1,234,567"
 * currencyFormat(1234567.89, true, 3) // returns "1,234,567.890"
 */
export const currencyFormat = (_n, _ad = true, _d = 2) => {
	let _sn = String(trimOverkill(_n, _d)),
		_3 = 3,
		_0 = 0
	let pSn = _sn.slice(0, _sn.indexOf('.') === -1 ? undefined : _sn.indexOf('.'))
	let _snl = String(pSn).length
	const _nm3 = Math.floor(_snl / _3)
	if (_nm3) {
		_snl -= _3
		for (_snl; _snl > _0; _snl -= _3) {
			if (_nm3 !== _0) {
				const _ = pSn.slice(_0, _snl)
				const __ = pSn.slice(_snl)
				pSn = `${_},${__}`
			}
		}
	}
	const dp_ = _sn.includes('.') ? _sn.slice(_sn.indexOf('.') + 1) : ''
	const ret = `${pSn}${dp_ === '' && _ad ? '.00' : dp_ ? `.${dp_}` : ''}`
	return ret
}
