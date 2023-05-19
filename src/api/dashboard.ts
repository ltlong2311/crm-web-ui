import { TimePayload } from '@interfaces';
import { LogApp } from '@utils';
import { ApiClient } from './axiosClient';

export const dashboardAPI = {
  getGeneralInfo: (params: any) => {
    const url = `/dashboard/general`;
    return ApiClient.get(url, { params });
  },
  getNewCustomers: (params: any) => {
    const url = `/dashboard/general`;
    return ApiClient.get(url, { params });
  },
  getActiveCustomers: (params: any) => {
    const url = `/dashboard/customers`;
    return ApiClient.get(url, { params });
  },
  getCustomerTiers: () => {
    const url = `/dashboard/tier-member`;
    return ApiClient.get(url);
  },
  getOverviewStatistic: () => {
    const url = `/dashboard/total-statistic`;
    return ApiClient.get(url);
  },
  getTopSpentUsers: ({ page, limit }: { page: number; limit: number }) => {
    const url = `/dashboard/spending-member?limit=${limit}&page=${page}`;
    return ApiClient.get(url);
  },
};
