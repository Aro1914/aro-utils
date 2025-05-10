export function truncate(string, displayLength) {
	if (!string) return string
	const truncatedString = `${string.substring(
		0,
		displayLength
	)}...${string.substring(string.length - displayLength)}`
	return truncatedString
}
