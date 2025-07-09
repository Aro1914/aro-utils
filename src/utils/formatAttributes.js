/**
 * @description
 * Format an object's key-value pairs into a string with capitalized values.
 * Each key-value pair is formatted as "Key (Value)".
 * Multiple pairs are joined together with a comma and a space.
 * @param {Object} obj The object to format.
 * @returns {String} The formatted string.
 * @example
 * const obj = { a: 'x', b: 'y', c: 'z' };
 * const formatted = formatAttributes(obj);
 * console.log(formatted); // 'A (X), B (Y), C (Z)'
 */
export function formatAttributes(obj) {
	return Object.entries(obj)
		.map(([key, value]) => {
			const capitalizedKey = key
				.split(' ')
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(' ')

			const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1)

			return `${capitalizedKey} (${capitalizedValue})`
		})
		.join(', ')
}