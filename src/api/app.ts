import { enumStatus } from '../configs/enum';
import {  CustomerPayload, ICreateCustomerBody } from '@interfaces';
import { ApiClient } from './axiosClient';

export const appAPI = {
  uploadImage: (body: any) => {
    const url = `/clouds`;
    return ApiClient.post(url, body);
  },
};
