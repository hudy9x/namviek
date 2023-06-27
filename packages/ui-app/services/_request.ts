
const getUrl = (url: string) => {
	let baseUrl = process.env.NEXT_PUBLIC_BE_GATEWAY || ''

	url = url.replace(/^\/+/, '')
	baseUrl = baseUrl.replace(/\/+$/, '')

	return `${baseUrl}/${url}`
}

export const useRequest = () => {
	const getToken = () => {
		return '10928301928'
	}

	const post = async <T>(url: string, data: T) => {
		const token = getToken()

		return fetch(getUrl(url), {
			method: "POST",
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data)
		})
	}

	const get = async (url: string) => {
		const token = getToken()
		return fetch(getUrl(url), {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
	}

	const put = async <T>(url: string, data: T) => {
		const token = getToken()

		return fetch(getUrl(url), {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data)
		})
	}


	const del = async (url: string) => {
		const token = getToken()

		return fetch(getUrl(url), {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			}
		})
	}

	return {
		post,
		get,
		put,
		del
	}
}
