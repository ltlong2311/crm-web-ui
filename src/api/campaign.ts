import { enumStatus } from '../configs/enum';
import { ApiClient } from './axiosClient';

export const campaignAPI = {
  getList: (params: any) => {
    const url = '/campaigns';
    return ApiClient.get(url, { params });
  },

  getOne: (id: number | string) => {
    const url = `/campaigns/${id}`;
    return ApiClient.get(url);
  },

  create: (body: any) => {
    const url = '/campaigns';
    return ApiClient.post(url, body);
  },

  updateStatus: (id: number, body: { status: enumStatus }) => {
    const url = `/campaigns/${id}`;
    return ApiClient.patch(url, body);
  },

  update: (id: number | string, body: any) => {
    const url = `/campaigns/${id}`;
    return ApiClient.patch(url, body);
  },

  delete: (id: string | number) => {
    const url = `/campaigns/${id}`;
    return ApiClient.delete(url);
  },
};
