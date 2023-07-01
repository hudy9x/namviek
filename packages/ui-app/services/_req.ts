import {
  clearAllGoalieToken,
  getGoalieRefreshToken,
  getGoalieToken,
  saveGoalieRefreshToken,
  saveGoalieToken
} from '@goalie/nextjs';
import { messageError } from '@shared/ui';
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_GATEWAY || ''
});

instance.interceptors.request.use(
  function(config) {
    const authorization = getGoalieToken();
    const refreshToken = getGoalieRefreshToken();

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
      saveGoalieToken(authorization);
      saveGoalieRefreshToken(refreshtoken);
    }

    return config;
  },
  function(error) {
    const { response } = error;
    if (response && response.status === 440) {
      messageError('Your session is expired. Please login again !');
      clearAllGoalieToken();
      window.location.href = `/sign-in?redirectUrl=${window.location.pathname}`;
    }
    console.log('ERRIRIRIR', response.status);
    return Promise.reject(error);
  }
);

export const req = instance;
export const httpGet = req.get;
export const httpPost = req.post;
export const httpPut = req.put;
export const httpDel = req.delete;
