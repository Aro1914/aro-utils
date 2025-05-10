/**
 * Creates a throttled version of a function that limits its execution frequency
 * @param {Function} func - The function to throttle
 * @param {number} limit - The minimum time (in ms) between function executions
 * @returns {Function} A throttled version of the input function
 * @example
 * const throttledScroll = throttle(handleScroll, 100);
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
