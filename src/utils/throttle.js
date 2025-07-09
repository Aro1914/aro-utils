/**
 * Returns a new function that will only call the given function once per given
 * limit (in milliseconds). This is useful for preventing a function from being
 * called too rapidly.
 *
 * @param {function} func - The function to limit the call of.
 * @param {number} limit - The limit in milliseconds.
 */
export const throttle = (func, limit) => {
	let lastFunc
	let lastRan

	return function (...args) {
		if (!lastRan) {
			const context = this
			func.apply(context, args)
			lastRan = Date.now()
		} else {
			clearTimeout(lastFunc)
			lastFunc = setTimeout(() => {
				if (Date.now() - lastRan >= limit) {
					func.apply(context, args)
					lastRan = Date.now()
				}
			}, limit - (Date.now() - lastRan))
		}
	}
}
