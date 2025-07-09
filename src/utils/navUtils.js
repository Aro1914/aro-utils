import { getConfig } from '../config'
const { COLLECTION_RE } = getConfig()

/**
 * Checks if a given link is focused based on the current pathname.
 *
 * This function is used by the NavLink component to determine which link
 * should be focused.
 *
 * The following rules are applied:
 * - If the link is '/', then the component is focused if the pathname is
 *   '/', or if the pathname starts with '/auctions' or '/shuffles', or if
 *   the pathname matches the COLLECTION_RE regular expression (i.e., a 24-hex
 *   collection ID).
 * - If the link is not '/', then the component is focused if the pathname
 *   starts with the link.
 *
 * @param {string} pathname - The current URL pathname
 * @param {string} link - The link to check
 * @param {boolean} [useStrictHome=false] - If true, the component is only
 *   focused if the pathname is '/'
 * @returns {boolean} Whether the link is focused
 */
export function isFocused(pathname, link, useStrictHome = false, paths = []) {
	// “/” should be focused when on Auctions, Shuffles or a 24-hex collection ID
	if (
		link === '/' &&
		(useStrictHome
			? pathname === '/'
			: paths.some((p) => pathname.startsWith(p)) ||
			  COLLECTION_RE.test(pathname))
	) {
		return true
	}
	if (link === '/') {
		return pathname === '/'
	}
	return pathname.startsWith(link)
}
