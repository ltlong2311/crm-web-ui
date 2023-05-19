import { IGetListParams } from '@interfaces';
import { ApiClient } from './axiosClient';

export const branchAPI = {
  getList: (params: IGetListParams) => {
    const url = `/stores`;
    return ApiClient.get(url, {params});
  },
  getOne: (id: number | string) => {
    const url = `/stores/${id}`;
    return ApiClient.get(url);
  },
  create: (body: any) => {
    const url = '/stores';
    return ApiClient.post(url, body);
  },
  update: (id: number | string, body: any) => {
    const url = `/stores/${id}`;
    return ApiClient.patch(url, body);
  },

  delete: (id: number | string) => {
    const url = `/stores/${id}`;
    return ApiClient.delete(url);
  },
};
