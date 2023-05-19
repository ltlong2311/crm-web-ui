import { enumStatus } from '../configs/enum';
import { CustomerPayload, ICreateCustomerBody } from '@interfaces';
import { ApiClient } from './axiosClient';

export const chanceAPI = {
  getList: (params: CustomerPayload) => {
    const url = '/chances';
    return ApiClient.get(url, { params });
  },

  getOne: (id: number | string) => {
    const url = `/chances/${id}`;
    return ApiClient.get(url);
  },

  create: (body: any) => {
    const url = '/chances';
    return ApiClient.post(url, body);
  },

  updateStatus: (id: number, body: { status: enumStatus }) => {
    const url = `/chances/${id}`;
    return ApiClient.patch(url, body);
  },

  update: (id: number | string, body: any) => {
    const url = `/chances/${id}`;
    return ApiClient.patch(url, body);
  },

  delete: (id: string | number) => {
    const url = `/chances/${id}`;
    return ApiClient.delete(url);
  },
};
