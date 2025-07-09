import { getConfig } from '../config'
const { NETWORK } = getConfig();

const NFD_REST_API_BASE_URL = `https://api${
	NETWORK === 'testnet' ? '.testnet' : ''
}.nf.domains/nfd/`

export const getNFD = async (address) => {
	if (!address) return { success: false }
	return await fetch(
		`${NFD_REST_API_BASE_URL}lookup?address=${address}&view=thumbnail`
	)
		.then((res) => res.json())
		.then((data) => ({ ...data, success: Boolean(Object.keys(data)?.length) }))
		.catch((error) => {
			return {
				...error,
				success: false,
			}
		})
}

export const getAddress = async (nfd) => {
	if (!nfd) return { success: false }
	return await fetch(`${NFD_REST_API_BASE_URL}${String(nfd).toLowerCase()}`)
		.then((res) => res.json())
		.then((data) => ({ ...data, success: Boolean(Object.keys(data)?.length) }))
		.catch((error) => {
			return {
				...error,
				success: false,
			}
		})
}

export const getNFDs = async (address) => {
	if (!address) return { success: false }
	return await fetch(
		`${NFD_REST_API_BASE_URL}v2/search?owner=${address}&view=thumbnail&limit=200`
	)
		.then((res) => res.json())
		.then((data) => ({ ...data, success: Boolean(Object.keys(data)?.length) }))
		.catch((error) => {
			return {
				...error,
				success: false,
			}
		})
}

export const getSegmentsOfNFD = async (nfd) => {
	if (!nfd) return { success: false }
	return await fetch(
		`${NFD_REST_API_BASE_URL}v2/search?name=${String(
			nfd
		).toLowerCase()}&view=thumbnail`
	)
		.then((res) => res.json())
		.then((data) => ({ ...data, success: data?.nfds?.length }))
		.catch((error) => {
			return {
				...error,
				success: false,
			}
		})
}

export const verifySegment = ({
	nfd,
	segment,
	includeRoot = false,
	standardSegment = true,
}) => {
	if (!nfd || !segment) return false
	const nfdParts = String(nfd).toLowerCase().split('.')
	const segmentParts = String(segment).toLowerCase().split('.')
	let qualified = true,
		n = nfdParts.length - 1,
		s = segmentParts.length - 1

	if (!includeRoot && n === s) return false
	if (standardSegment && s !== 2) return false

	while (n > 0) {
		qualified = String(nfdParts[n]) === String(segmentParts[s])
		if (!qualified) break
		n--
		s--
	}

	return qualified
}

export const validateNFDFormat = (x, isBase = false) => {
	if (!x) return false
	const split = String(x).toLowerCase().split('.')
	return (
		split.length > 1 &&
		split.length < (isBase ? 3 : 4) &&
		split.reduce(
			(accu, next) =>
				accu === false || Boolean(next) === false ? false : true,
			true
		) &&
		split[split.length - 1] === 'algo'
	)
}

export const validateNFD = async (x, isBase = false) => {
	if (!x) return false
	const formatValid = validateNFDFormat(x, isBase)
	if (formatValid) {
		const res = await getAddress(x)
		return res.success && res?.name && res?.state === 'owned' && res?.owner
	}
	return false
}

/**
 * Resolves an Algorand Non-Fungible Domain (NFD) address or domain.
 * @param {string} address - The Algorand address or NFD domain to resolve.
 * @param {boolean} [isBase=false] - Flag indicating if the address is a base domain.
 * @returns {Promise<{success: boolean, nfd: string|null}>} Object containing:
 *   - success: Indicates if resolution was successful
 *   - nfd: The resolved NFD domain name if successful, null or original address if not
 * @async
 */
export const resolveNFD = async (address, isBase = false) => {
	if (!address) return { success: false, nfd: null }
	const formatValid = validateNFDFormat(address, isBase)
	if (formatValid) {
		const isValidNFD = await validateNFD(address, isBase)
		return {
			success: isValidNFD,
			nfd: isValidNFD ? address : null,
		}
	} else {
		const res = await getNFD(address)
		const success = res.success && res?.[address].name
		return { success, nfd: success ? res?.[address].name : address }
	}
}

/**
 * Resolves an Algorand NFD (Non-Fungible Domain) to its corresponding wallet address
 * @param {string} nfd - The NFD to resolve (e.g., 'example.algo')
 * @param {boolean} [isBase=false] - Flag indicating if the NFD is a base domain
 * @returns {Promise<{success: boolean, address: string|null}>} Object containing:
 *   - success: Indicates if resolution was successful
 *   - address: The resolved Algorand wallet address if successful, null if unsuccessful
 * @async
 */
export const resolveAddress = async (nfd, isBase = false) => {
	if (!nfd) return { success: false, address: null }
	const formatValid = validateNFDFormat(nfd, isBase)
	if (formatValid) {
		const res = await getAddress(nfd)
		const success = res.success && res?.[nfd]?.address
		return { success, address: success ? res[nfd].address : null }
	}
	return {
		success: false,
		address: null,
	}
}