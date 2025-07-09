/**
 * Truncates a given text to a certain display length.
 *
 * @param {string} text - The text to be truncated.
 * @param {number} displayLength - The length of the text to be displayed.
 *
 * @returns {string} A truncated version of the text, with the first and last
 *     displayLength characters displayed and the middle replaced with an ellipsis.
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
