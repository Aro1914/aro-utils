/**
 * Converts a Unix timestamp to a human-readable date string.
 * @param {number} unixTimestamp the timestamp to convert
 * @param {{includeTime: boolean, includeYear: boolean}} [options]
 * @param {boolean} [options.includeTime=true] whether to include the time in the output
 * @param {boolean} [options.includeYear=false] whether to include the year in the output
 * @returns {Array<string>} an array of 2 or 3 elements: the date string, the day suffix (e.g. 'st', 'nd', 'th'), and optionally the year
 */
export function formatTimestamp(
	unixTimestamp,
	{ includeTime = true, includeYear = false } = {}
) {
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

	const year = date.getFullYear()

	const returnValue = [
		`${includeTime ? `${time}, ` : ''}${dayMonth}`,
		`${tag[dayMonth[dayMonth.length - 1]]}`,
	]
	if (includeYear) returnValue.push(String(year))
	return returnValue
}
