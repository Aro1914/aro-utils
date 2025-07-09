/**
 * Splits an array of transactions into smaller batches.
 *
 * @param {Array} txns - The array of transactions to be split into batches.
 * @param {number} [batchCount=16] - The number of transactions per batch. Defaults to 16.
 * @returns {Array<Array>} An array containing batches of transactions, each of size `batchCount` or less.
 */
export const splitTransactions = (txns, batchCount = 16) => {
	const batch_ = txns
	const batchLen_ = batch_.length
	const steps_ = Math.ceil(batchLen_ / batchCount)
	let step_ = 1
	const wrapperTxn = []
	while (step_ <= steps_) {
		const point = (step_ - 1) * batchCount
		const end = step_ * batchCount
		const stop = end > batchLen_ ? batchLen_ : end
		let i = point
		const txns = []
		while (i < stop) {
			txns.push(batch_[i])
			i++
		}
		wrapperTxn.push(txns)
		step_++
	}

	return wrapperTxn
}
