/**
 * Creates a debounced function that delays execution until after the specified delay.
 * @param {function} func - The function to debounce.
 * @param {number} delay - The delay in milliseconds.
 * @returns {function} A debounced function.
 */
export function deBounce(func, delay) {
	let timeoutID
	return function (...args) {
		if (timeoutID) {
			clearTimeout(timeoutID)
		}
		timeoutID = setTimeout(() => {
			func.apply(this, args)
		}, delay)
	}
}
