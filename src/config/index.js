let config = {
	NETWORK: 'mainnet',
	SERVER_URI: 'https://default-server.com',
	COLLECTION_RE: /^\/[a-f0-9]{24}$/,
	DEFAULT_SIZE: 24,
}

// Validation function
function validateConfig(conf) {
	if (
		conf.NETWORK &&
		!['mainnet', 'testnet', 'devnet'].includes(conf.NETWORK)
	) {
		throw new Error(
			`Invalid NETWORK: ${conf.NETWORK}. Must be one of: mainnet, testnet, devnet`
		)
	}

	if (conf.SERVER_URI && typeof conf.SERVER_URI !== 'string') {
		throw new Error('SERVER_URI must be a string')
	}
}

export function getConfig() {
	return { ...config }
}

export function setConfig(newConfig) {
	validateConfig(newConfig)
	config = { ...config, ...newConfig }
	return config
}
