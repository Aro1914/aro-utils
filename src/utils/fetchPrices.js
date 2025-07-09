import axios from 'axios'

/**
 * Fetch prices for specified asset IDs from Vestige API.
 *
 * @param {Object} options - The options for fetching prices
 * @param {number|number[]} options.assetIDs - Asset IDs to fetch
 * @param {number} [options.networkId=0] - Network (0 = mainnet, 1 = testnet, 2 = betanet)
 * @param {number} [options.denominatingAssetId=0] - Asset to denominate against (0 = ALGO)
 * @param {number} [options.amount=1] - Amount of base asset to calculate price for
 *
 * @returns {Promise<{success: boolean, prices: {assetID: number, priceForOne: number, priceForAmount: number, denominatingOne: number}[]}>}
 */
export async function fetchPrices(options) {
	const {
		assetIDs,
		networkId = 0,
		denominatingAssetId = 0,
		amount = 1,
	} = options

	try {
		// Prepare IDs for query
		const IDs = Array.isArray(assetIDs) ? assetIDs : [assetIDs]
		const query = IDs.join(',')

		// Perform API request
		const response = await axios.get(
			`https://api.vestigelabs.org/assets/price`,
			{
				params: {
					asset_ids: query,
					network_id: networkId,
					denominating_asset_id: denominatingAssetId,
				},
			}
			// https://api.vestigelabs.org/assets/price?asset_ids=0&denominating_asset_id=0
		)

		// Transform response
		if (!Array.isArray(response.data) || response.data.length === 0) {
			return { success: false, prices: [] }
		}

		const prices = response.data.map((item) => ({
			assetID: item.asset_id,
			priceForOne: item.price,
			priceForAmount: amount / item.price,
			denominatingOne: 1,
		}))

		return { success: true, prices }
	} catch (error) {
		console.error(error)
		return { success: false, prices: [] }
	}
}
