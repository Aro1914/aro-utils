/**
 * Truncates a text string by keeping the beginning and end parts while adding an ellipsis in the middle.
 * @param {string} text - The input text to truncate
 * @param {number} displayLength - The number of characters to keep at the beginning and end of the truncated text
 * @returns {string} The truncated text with ellipsis in the middle, or the original text if it's short enough
 * 
 * @example
 * truncate("abcdefghijklmnop", 3) // returns "abc...nop"
 * truncate("abcdef", 3) // returns "abcdef"
 * truncate("", 3) // returns ""
 */
export function truncate(text, displayLength) {
	if (!text) return text
	const minLength = displayLength * 2 + 3
	if (text.length <= minLength) {
		return text
	}

	if (text.length === minLength + 1) {
		const start = text.slice(0, displayLength)
		const end = text.slice(-displayLength + 1)
		return `${start}...${end}`
	}

	const start = text.slice(0, displayLength)
	const end = text.slice(-displayLength)
	return `${start}...${end}`
}
