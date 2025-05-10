/**
 * Creates a debounced version of a function that delays its execution until after a specified delay
 * @param {Function} func - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @returns {Function} A debounced version of the input function
 * @example
 * const debouncedSearch = deBounce(searchFunction, 300);
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
