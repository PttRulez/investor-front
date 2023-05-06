import axios, {AxiosInstance, CreateAxiosDefaults} from 'axios';
import {urls} from '@/constants/common';
export const investorApi: AxiosInstance = axios.create({
  baseURL: urls.investor,
} as CreateAxiosDefaults);

investorApi.interceptors.request.use((config) => {
  config.headers['Accept'] = 'application/json';
  config.headers['Content-Type'] = 'application/json';
  return config;
});
