/**
 * Formats a Unix timestamp into a human-readable date/time string with the appropriate ordinal indicator
 * @param {number} unixTimestamp - The Unix timestamp to format (milliseconds since Unix epoch)
 * @returns {[string, string]} An array containing two elements:
 *                            - First element: formatted string in the format "HH:MM AM/PM, Day Month"
 *                            - Second element: ordinal indicator ('st', 'nd', 'rd', or 'th')
 * @example
 * formatTimestamp(1672531200000) // Returns ["12:00 AM, Sunday January 1", "st"]
 */
export function formatTimestamp(unixTimestamp) {
	const tag = {
		1: 'st',
		2: 'nd',
		3: 'rd',
		4: 'th',
		5: 'th',
		6: 'th',
		7: 'th',
		8: 'th',
		9: 'th',
		0: 'th',
	}
	
	const date = new Date(unixTimestamp)

	
	const timeOptions = {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true,
	}

	
	const dateOptions = {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
	}

	const timeFormatter = new Intl.DateTimeFormat('en-US', timeOptions)
	const dateFormatter = new Intl.DateTimeFormat('en-US', dateOptions)

	const time = timeFormatter.format(date)
	const dayMonth = dateFormatter.format(date)

	return [`${time}, ${dayMonth}`, `${tag[dayMonth[dayMonth.length - 1]]}`]
}
