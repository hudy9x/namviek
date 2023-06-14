export const saveClerkToken = (token: string) => {
	window.localStorage.setItem('CLERK_TOKEN', token)
}

export const getClerkToken = () => window.localStorage.getItem('CLERK_TOKEN')

const getDefaultHttpOptions = (options?: RequestInit) => {

	const token = getClerkToken()
	const defaultHeaderOptions = {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}

	options = { ...(options || {}), ...defaultHeaderOptions }

	console.log('options', options)

	return options
}

const getUrl = (url: string) => {
	let baseUrl = process.env.NEXT_PUBLIC_BE_GATEWAY || ''
	url = url.replace(/^\/+/, '')
	console.log('baseUIR;', baseUrl)
	baseUrl = baseUrl.replace(/\/+$/, '')

	return `${baseUrl}/${url}`
}

// Define HTTP method - GET, POST, PUT, DELETE
// Refers: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

export const httpGet = async (url: string, options?: RequestInit) => {
	return fetch(getUrl(url), getDefaultHttpOptions({
		...options,
		method: "GET"
	}))
}

export const httpPost = async <T>(url: string, data: T, options?: RequestInit) => {
	return fetch(getUrl(url), getDefaultHttpOptions({
		...options,
		...{
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(data)
		}
	}))
}

export const httpPut = async <T>(url: string, data: T) => {
	return fetch(getUrl(url), getDefaultHttpOptions({
		method: "PUT",
		headers: {
			"Content-type": "application/json"
		},
		body: JSON.stringify(data)
	}))
}

export const httpDel = async (url: string) => {
	return fetch(getUrl(url), getDefaultHttpOptions({
		method: "DELETE"
	}))
}


