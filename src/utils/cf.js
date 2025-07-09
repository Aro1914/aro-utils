/**
 * Classname formatter. Will concatenate and dedupe class names with a space.
 *
 * @param {string} [_class] - First class name
 * @param {...string} [classes] - Additional class names
 * @returns {string} Concatenated class names
 * @example
 * cf('px-4', 'py-2', 'bg-blue') // => 'bg-blue px-4 py-2'
 * cf('px-4', 'bg-blue') // => 'px-4 bg-blue'
 * cf('px-4') // => 'px-4'
 * cf() // => ''
 */
export const cf = (_class = '', ...classes) => {
	if (_class && classes)
		return [_class, ...classes]
			.reverse()
			.filter((c) => c)
			.reduce((a, b) => '' + a + ' ' + b)
	return String(_class)
}
