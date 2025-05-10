/**
 * Splits an array of transactions into multiple arrays with a maximum length of 16 transactions each
 * @param {Array} txns - The array of transactions to be split
 * @returns {Array<Array>} An array containing subarrays of transactions, each subarray having maximum 16 elements
 */
export const splitTransactions = (txns) => {
	const batch_ = txns
	const batchLen_ = batch_.length
	const steps_ = Math.ceil(batchLen_ / 16)
	let step_ = 1
	const wrapperTxn = []
	while (step_ <= steps_) {
		const point = (step_ - 1) * 16
		const end = step_ * 16
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
