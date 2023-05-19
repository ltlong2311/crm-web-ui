import { LogApp } from '@utils';
import { IGetBannerParams, IGetCashbackRulesParams } from '@interfaces';
import { ApiClient } from './axiosClient';

export const categoriesAPI = {
  getList: (params: any) => {
    const url = '/categories';
    return ApiClient.get(url, { params });
  },

  getOne: (id: number | string) => {
    const url = `/categories/${id}`;
    return ApiClient.get(url);
  },

  create: (body: any) => {
    const url = '/categories';
    return ApiClient.post(url, body);
  },

  updateStatus: (id: number, body: { status: any }) => {
    const url = `/categories/${id}`;
    return ApiClient.patch(url, body);
  },

  update: (id: number | string, body: any) => {
    const url = `/categories/${id}`;
    return ApiClient.patch(url, body);
  },

  delete: (id: number | string) => {
    const url = `/categories/${id}`;
    return ApiClient.delete(url);
  },

  getBanners: (params: IGetBannerParams) => {
    const url = '/banners';
    LogApp({ params });
    return ApiClient.get(url, { params });
  },

  getOneBanner: (id: number | string) => {
    const url = `/banners/${id}`;
    return ApiClient.get(url);
  },

  createBanner: (body: any) => {
    const url = '/banners';
    return ApiClient.post(url, body);
  },

  updateBanner: (id: number | string, body: any) => {
    const url = `/banners/${id}`;
    return ApiClient.patch(url, body);
  },

  deleteBanner: (id: number | string) => {
    const url = `/banners/${id}`;
    return ApiClient.delete(url);
  },
};
