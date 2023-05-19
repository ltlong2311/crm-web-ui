import { enumStatus } from '../configs/enum';
import { IGetCashbackRulesParams, CustomerPayload, ICreateCustomerBody } from '@interfaces';
import { ApiClient } from './axiosClient';

export const customerCategoryAPI = {
  getList: (params: any) => {
    const url = '/classifications';
    return ApiClient.get(url, { params });
  },

  getOne: (id: number | string) => {
    const url = `/classifications/${id}`;
    return ApiClient.get(url);
  },

  create: (body: any) => {
    const url = '/classifications';
    return ApiClient.post(url, body);
  },

  updateStatus: (id: number, body: { status: enumStatus }) => {
    const url = `/classifications/${id}`;
    return ApiClient.patch(url, body);
  },

  update: (id: number | string, body: any) => {
    const url = `/classifications/${id}`;
    return ApiClient.patch(url, body);
  },

  delete: (id: number | string) => {
    const url = `/classifications/${id}`;
    return ApiClient.delete(url);
  },
};
