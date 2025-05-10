/**
 * Calculates the number of days remaining in a subscription
 * @param {string|Date} renewalTimestamp - The renewal date timestamp
 * @param {number} daysRenewed - The number of days in the renewal period
 * @returns {number} The number of days remaining (0 if expired)
 */
export function getSubDaysLeft(renewalTimestamp, daysRenewed) {
	const renewalDate = new Date(renewalTimestamp)

	const endDate = new Date(renewalDate)
	endDate.setDate(renewalDate.getDate() + daysRenewed)

	const currentDate = new Date()

	const timeDifference = endDate - currentDate

	const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))

	return daysRemaining > 0 ? daysRemaining : 0
}
