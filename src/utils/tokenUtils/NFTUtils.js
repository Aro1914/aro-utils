/**
 * Creates a function that extracts NFT numbers from NFT names based on configurable patterns.
 *
 * @param {Object} [options] - Configuration options for the number extractor
 * @param {RegExp[]} [options.preferredPatterns] - Array of regular expressions for generic number matching patterns
 * @param {Object.<string, RegExp>} [options.collectionPatterns] - Object mapping collection names to their specific regex patterns
 * @param {boolean} [options.fallbackToGeneric=true] - Whether to try generic patterns if collection-specific patterns fail
 *
 * @returns {Function} A function that takes an NFT name string and returns the extracted number in #n format or null if no number found
 *
 * @example
 * const extractNumber = createNftNumberExtractor();
 * console.log(extractNumber("Pigeon Puff #123")); // Returns "#123"
 * console.log(extractNumber("Ghetto Pigeon 456")); // Returns "#456"
 * console.log(extractNumber("NFT 789")); // Returns "#789"
 */
export function createNftNumberExtractor(options = {}) {
	// Default configuration
	const defaultOptions = {
		// Generic patterns in order of preference
		preferredPatterns: [
			/#(\d+)/, // Explicit #123 format
			/(\d+)$/, // Number at the end
			/\s(\d+)(?:\s|$)/, // Number after space
			/[^0-9](\d+)[^0-9]|[^0-9](\d+)$|^(\d+)[^0-9]/, // Isolated number
		],
		// Collection-specific patterns
		collectionPatterns: {
			'Ghetto Pigeon': /Ghetto Pigeon (\d+)/,
			'Pigeon Puff': /Pigeon Puff #(\d+)/,
		},
		fallbackToGeneric: true, // Use generic patterns if collection-specific fails
	}

	// Merge with user options
	const config = { ...defaultOptions, ...options }

	return function (nftName) {
		// First try collection-specific patterns
		for (const collection in config.collectionPatterns) {
			if (nftName.includes(collection)) {
				const match = nftName.match(config.collectionPatterns[collection])
				if (match && match[1]) {
					return `#${parseInt(match[1], 10)}`
				}
			}
		}

		// If no collection match or fallback is enabled
		if (config.fallbackToGeneric) {
			for (const pattern of config.preferredPatterns) {
				const match = nftName.match(pattern)
				if (match) {
					// Find the first non-undefined capturing group
					const capturedGroup = match
						.slice(1)
						.find((group) => group !== undefined)
					if (capturedGroup) {
						return `#${parseInt(capturedGroup, 10)}`
					}
				}
			}
		}

		return null // No number found
	}
}
