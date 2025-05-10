/**
 * Combines multiple CSS class names into a single space-separated string
 * @param {string} _class - The base class name
 * @param {...string} classes - Additional class names to concatenate
 * @returns {string} A space-separated string of class names
 * @example
 * cf('btn', 'btn-primary', 'active') // returns 'btn btn-primary active'
 */
export const cf = (_class = '', ...classes) => {
	if (_class && classes)
		return [_class, ...classes].reduce((a, b) => '' + a + ' ' + b)
	return String(_class)
}
