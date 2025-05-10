
/**
 * Converts milliseconds to a formatted time string
 * @param {Object} options - The options object
 * @param {number} options.duration - The duration in milliseconds
 * @param {boolean} [options.includeSeconds=true] - Whether to include seconds in the output
 * @param {boolean} [options.includeDays=false] - Whether to include days in the output
 * @returns {Array} An array containing:
 * - [0]: Formatted time string with padded zeros (e.g., "00:00:00.0")
 * - [1]: Formatted time string with numbers (e.g., "0:0:0")
 * - [2]: Human-readable time string (e.g., "1 hour, 30 minutes, 45 seconds")
 * - [3]: Object containing parsed time components {days, hours, minutes, seconds, milliseconds}
 */
export function msToTime({
	duration,
	includeSeconds = true,
	includeDays = false,
}) {
	let milliseconds = Math.floor((duration % 1000) / 100),
		seconds = Math.floor((duration / 1000) % 60),
		minutes = Math.floor((duration / (1000 * 60)) % 60),
		hours = Math.floor((duration / (1000 * 60 * 60)) % 24),
		days = Math.floor(duration / (1000 * 60 * 60 * 24))

	days = days < 10 ? '0' + days : days
	hours = hours < 10 ? '0' + hours : hours
	minutes = minutes < 10 ? '0' + minutes : minutes
	seconds = seconds < 10 ? '0' + seconds : seconds

	return [
		`${includeDays ? `${days}:` : ''}${hours}:${minutes}${
			includeSeconds ? `:${seconds}.${milliseconds}` : ''
		}`,
		`${includeDays ? `${Number(days)}:` : ''}${Number(hours)}:${Number(
			minutes
		)}${includeSeconds ? `:${Number(seconds)}` : ''}`,
		`${
			includeDays && Number(days)
				? `${Number(days) === 1 ? 'a' : Number(days)} day${
						Number(days) > 1 || Number(days) === 0 ? 's' : ''
				  }${Number(hours) ? ', ' : ''}`
				: ''
		}${
			Number(hours)
				? `${Number(hours) === 1 ? 'a' : Number(hours)} hour${
						Number(hours) > 1 || Number(hours) === 0 ? 's' : ''
				  }${Number(minutes) ? ', ' : ''}`
				: ''
		}${
			Number(minutes)
				? `${Number(minutes) === 1 ? 'a' : Number(minutes)} minute${
						Number(minutes) > 1 || Number(minutes) === 0 ? 's' : ''
				  }${includeSeconds && Number(seconds) ? ', ' : ''}`
				: ''
		}${
			includeSeconds && Number(seconds)
				? `${Number(seconds) === 1 ? 'a' : Number(seconds)} second${
						Number(seconds) > 1 || Number(seconds) === 0 ? 's' : ''
				  }`
				: ''
		}` || 'a moment',
		{ days, hours, minutes, seconds, milliseconds },
	]
}
