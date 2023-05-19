import { enumStatus } from '../configs/enum';
import { ApiClient } from './axiosClient';

export const bannerAPI = {
  getList: (params: any) => {
    const url = '/banners';
    return ApiClient.get(url, { params });
  },

  getOne: (id: number | string) => {
    const url = `/banners/${id}`;
    return ApiClient.get(url);
  },

  create: (body: any) => {
    const url = '/banners';
    return ApiClient.post(url, body);
  },

  updateStatus: (id: number, body: { status: enumStatus }) => {
    const url = `/banners/${id}`;
    return ApiClient.patch(url, body);
  },

  update: (id: number | string, body: any) => {
    const url = `/banners/${id}`;
    return ApiClient.patch(url, body);
  },

  delete: (id: string | number) => {
    const url = `/banners/${id}`;
    return ApiClient.delete(url);
  },
};
