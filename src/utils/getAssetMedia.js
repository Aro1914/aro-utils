import { getASAInfo } from './tokenUtils'


/**
 * Retrieves media information for a list of asset IDs
 * @param {(number|string)[]} [assetIDs] - Array of asset IDs to process
 * @returns {Promise<Array<{
 *   name?: string,
 *   mediaURL?: string,
 *   is_collectible?: boolean,
 *   mediaType?: string,
 *   extension?: string,
 *   logo?: string
 * }|string|null>>} Array of media objects or empty array if no assetIDs provided
 * - For collectibles: returns object with name, mediaURL, is_collectible, mediaType, and extension
 * - For non-collectibles with Pera fetch: returns object with logo and is_collectible
 * - For other assets: returns string URL or null
 * @throws {Error} Errors during processing individual assets are caught and ignored
 */
export const getAssetMedia = async (assetIDs) => {
	const media = []
	if (assetIDs) {
		const oLen = assetIDs.length
		let i = 0
		for (i; i < oLen; i++) {
			try {
				const assetID = Number(assetIDs[i] ?? 0)
				const asaInfo =
					assetID === 0
						? {
								logo: 'https://asa-list.tinyman.org/assets/0/icon.svg',
								is_collectible: false,
								mediaType: 'image',
								peraFetched: true,
						  }
						: await getASAInfo(assetID)
				const { peraFetched = false, is_collectible = false } = asaInfo
				const prop = peraFetched
					? 'peraFetched'
					: !asaInfo.isARC69
					? 'image'
					: 'url'
				let pfp = null
				if (asaInfo?.[prop]) {
					if (peraFetched) {
						if (is_collectible) {
							const media = asaInfo.collectible.media.find((e) => e.url)
							const urlParts = media.url.split('/')
							const cid = urlParts[urlParts.length - 1]
							pfp = {
								name: media?.name,
								mediaURL: String(media?.url).includes(
									'https://ipfs.algonode.dev'
								)
									? String(media?.url).replace(
											'https://ipfs.algonode.dev',
											'https://gateway.ipfs.io'
									  )
									: urlParts[urlParts.length - 2] === 'ipfs'
									? 'https://ipfs.io/ipfs/' +
									  cid +
									  '#x-ipfs-companion-no-redirect'
									: media?.url,
								is_collectible,
								mediaType: media?.type,
								extension: media?.extension,
							}
						} else {
							pfp = { logo: asaInfo?.logo, is_collectible }
						}
					} else {
						if (asaInfo?.[prop].indexOf('ipfs://') === 0) {
							asaInfo[prop] =
								'https://gateway.ipfs.io/ipfs/' + asaInfo?.[prop].slice(7)
						}
						pfp = `${asaInfo?.[prop] ?? null}`
					}
				}
				media.push(pfp)
			} catch (error) {
				// Oh well...
			}
		}
		return media
	} else return []
}
