/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { openToast, store } from 'src/redux';
import axios, { AxiosRequestConfig, CancelTokenSource } from 'axios';
import { LogApp } from '@utils';
import { toast } from 'react-toastify';
const queryString = require('query-string');
export interface ResponseType<T> {
  result_code: number;
  result_error: any;
  status: number;
  code: number;
  message: string;
  data: any;
  success: boolean;
}
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,

  headers: {
    'Content-Type': 'application/json',
    // 'X-Requested-With': 'XMLHttpRequest',
    // charset: 'UTF-8',
    // 'Access-Control-Allow-Origin': '*',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use((config: any) => {
  const role = store.getState().app.role;
  const auth = store.getState().auth;
  const token = auth.accessToken;

  config.headers['Authorization'] = `${token}`;
  // config.headers["Accept-Encoding"] = `gzip, deflate, br`;
  // config.headers["x-csrf-token"] = token;
  delete axios.defaults.headers.common['Accept-Encoding'];
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    LogApp('login respo', response);
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error: any) => {
    if (error.response) {
      // Request made and server responded
      LogApp('API error res', error.response);
      if (process.env.NODE_ENV === 'development') {
        toast(`Wait a minute, ây lỗi rồi này:\n${error.response.data.message}`, {
          position: 'bottom-center',
          autoClose: 5000,
          pauseOnHover: true,
          type: 'error',
          theme: 'colored',
        });
      }
    } else if (error.request) {
      // The request was made but no response was received
      LogApp('API error request', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      LogApp('Error', error.message);
    }
    throw error;
  }
);
function handleResult<T>(api: any, generic?: T) {
  return api.then((res: any) => handleResponse<T>(res));
}
function handleResponse<T>(data: ResponseType<T>) {
  return Promise.resolve(data);
}
export const ApiClient = {
  get: (url: string, payload?: any) => handleResult(axiosClient.get(url, payload)),
  post: (url: string, payload?: any) => handleResult(axiosClient.post(url, payload)),
  put: (url: string, payload?: any) => handleResult(axiosClient.put(url, payload)),
  path: (url: string, payload: any) => handleResult(axiosClient.patch(url, payload)),
  delete: (url: string, payload?: any) => handleResult(axiosClient.delete(url, { data: payload })),
  patch: (url: string, payload?: any) => handleResult(axiosClient.patch(url, payload)),
};
export default axiosClient;
