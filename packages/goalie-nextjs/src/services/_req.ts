'use client'
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_GATEWAY || ''
});

export const req = instance;
export const httpGet = req.get;
export const httpPost = req.post;
export const httpPut = req.put;
export const httpDel = req.delete;
