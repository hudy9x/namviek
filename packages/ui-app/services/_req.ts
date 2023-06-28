import { messageError } from '@shared/ui';
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_GATEWAY || ''
});

instance.interceptors.request.use(
  function(config) {
    const refreshToken = localStorage.getItem('REFRESH_TOKEN') || '';
    const authorization = localStorage.getItem('JWT_TOKEN') || '';

    config.headers.setAuthorization(authorization);
    config.headers.set('refreshtoken', refreshToken);
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function(config) {
    const headers = config.headers;
    const authorization = headers.authorization;
    const refreshtoken = headers.refreshtoken;

    if (authorization && refreshtoken) {
      localStorage.setItem('JWT_TOKEN', authorization);
      localStorage.setItem('REFRESH_TOKEN', refreshtoken);
    }

    return config;
  },
  function(error) {

    const {response} = error
    if (response && response.status === 440) {
      messageError('Your session is expired. Please login again !')

    }
    console.log('ERRIRIRIR', response.status)
    return Promise.reject(error);
  }
);

export const req = instance;
export const httpGet = req.get;
export const httpPost = req.post;
export const httpPut = req.put;
export const httpDel = req.delete;
