/**
 * Calculates the number of days left until a subscription ends.
 * 
 * @param {number|string|Date} renewalTimestamp - The timestamp or date when the subscription was renewed.
 * @param {number} daysRenewed - The number of days the subscription is valid after renewal.
 * @returns {number} The number of days remaining until the subscription expires. Returns 0 if the subscription has already expired.
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
