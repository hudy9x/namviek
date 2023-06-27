import axios from "axios";

const instance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BE_GATEWAY || ''
})

instance.interceptors.request.use(function(config) {
	config.headers.setAuthorization('NEED TO CONFIG AUTHORIZATION')
	return config;
}, function(error) {
		return Promise.reject(error)
	})

export const req = instance
export const httpGet = req.get
export const httpPost = req.post
export const httpPut = req.put
export const httpDel = req.delete
 
