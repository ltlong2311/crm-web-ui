import { LogApp } from '@utils';
import { IGetBannerParams, IGetCashbackRulesParams } from '@interfaces';
import { ApiClient } from './axiosClient';

export const productAPI = {
  getList: (params: any) => {
    const url = '/products';
    return ApiClient.get(url, { params });
  },

  getOne: (id: number | string) => {
    const url = `/products/${id}`;
    return ApiClient.get(url);
  },

  create: (body: any) => {
    const url = '/products';
    return ApiClient.post(url, body);
  },

  update: (id: number | string, body: any) => {
    const url = `/products/${id}`;
    return ApiClient.put(url, body);
  },

  delete: (id: number | string) => {
    const url = `/products/${id}`;
    return ApiClient.delete(url);
  },

};
