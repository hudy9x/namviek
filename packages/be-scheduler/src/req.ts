import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_GATEWAY
})

const API_URL = `${process.env.NEXT_PUBLIC_BE_GATEWAY}api`
console.log(API_URL)
const apiInstance = axios.create({
  baseURL: API_URL
})

export const reqApi = apiInstance
