import axios from 'axios'
import { getConfig } from '../config'

const { SERVER_URI } = getConfig()

const serverURI = SERVER_URI

const axiosCall = axios.create({
	baseURL: `${serverURI}/`,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
	timeout: 180000,
})

/**
 * Makes an HTTP request using axios
 * @param {Object} options - The request options
 * @param {string} [options.path=''] - The URL path for the request
 * @param {string} [options.method='get'] - The HTTP method (get, post, put, delete, etc.)
 * @param {string} [options.accessToken=''] - Bearer token for authorization
 * @param {Object} [options.body={}] - Request body/payload
 * @param {string} [options.prop='data'] - Property name to store response data
 * @returns {Promise<Object>} Response object containing:
 *   - [prop]: Response data (uses prop parameter name)
 *   - success: Boolean indicating if request was successful
 *   - status: HTTP status code (on error)
 *   - headers: Response headers (on error)
 * @throws {Error} Throws error object with success:false if request fails
 */
export const request = async ({
	path = '',
	method = 'get',
	accessToken = '',
	body = {},
	prop = 'data',
} = {}) => {
	const flags = {
		headers: {},
	}
	if (accessToken) flags.headers['Authorization'] = `Bearer ${accessToken}`
	try {
		if (method === 'get' && !Object.keys(body).length) {
			const res = await axiosCall.get(path, flags)
			return { [prop]: res.data, success: res.data?.success ?? true }
		}
		if (method === 'delete') {
			const res = await axiosCall.delete(path, {
				data: body,
				headers: { ...flags.headers },
			})
			return { [prop]: res.data, success: res.data?.success ?? true }
		}
		const res = await axiosCall?.[method](path, body, flags)
		return { [prop]: res.data, success: res.data?.success ?? true }
	} catch (err) {
		if (err.response)
			return {
				...err.response.data,
				status: err.response.status,
				headers: { ...err.response.headers },
				success: false,
			}
		else {
			return { ...err, success: false }
		}
	}
}

/**
 * Performs a file upload request to a specified endpoint.
 * @param {Object} options - The configuration options for the request.
 * @param {string} [options.path=''] - The endpoint path for the request.
 * @param {string} [options.method='get'] - The HTTP method to use (e.g., 'get', 'post').
 * @param {string} [options.accessToken=''] - Bearer token for authentication.
 * @param {File} [options.file={}] - The file to be uploaded.
 * @param {string} [options.prop='data'] - The property name for the response data in the return object.
 * @returns {Promise<Object>} A promise that resolves to an object containing:
 *   - If successful: { [prop]: responseData, success: true }
 *   - If error with response: { ...errorResponseData, status, headers, success: false }
 *   - If error without response: { ...error, success: false }
 */
export const requestUpload = async ({
	path = '',
	method = 'get',
	accessToken = '',
	file = {},
	prop = 'data',
} = {}) => {
	const flags = {
		headers: {},
	}
	if (accessToken) flags.headers['Authorization'] = `Bearer ${accessToken}`
	flags.headers['Content-Type'] = 'multipart/form-data'
	try {
		const formData = new FormData()
		formData.append('image', file)
		const res = await axiosCall?.[method](path, formData, flags)
		return { [prop]: res.data, success: true }
	} catch (err) {
		if (err.response)
			return {
				...err.response.data,
				status: err.response.status,
				headers: { ...err.response.headers },
				success: false,
			}
		else {
			return { ...err, success: false }
		}
	}
}

export const refreshRequest = async (accessToken) => {
	try {
		const flags = {
			headers: {},
		}
		flags.headers['Authorization'] = `Bearer ${accessToken}`
		const res = await axiosCall.post('refresh', {}, flags)
		return { ...res.data, success: true }
	} catch (err) {
		if (err.response)
			return {
				...err.response.data,
				status: err.response.status,
				headers: { ...err.response.headers },
				success: false,
			}
		else {
			return { ...err, success: false }
		}
	}
}
