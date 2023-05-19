export interface IBanner {
  id: number;
  name: string;
  description: string;
  image: string;
  status: boolean;
  type: string;
  action: string;
  tier_ids: Array<number>;
  merchant_id?: number;
  start_time: number | string;
  end_time: number | string;
  createdAt?: string;
  updatedAt?: string;
  no?: number | string;
  duration?: string;
  tiers?: Array<{
    id: number;
    name: string;
  }>;
}

export interface IGetBannerParams {
  num?: number;
  page: number;
  limit?: number;
  name?: string;
  signal?: AbortSignal;
}

export interface IcreateBanner {
  name: string;
  description: string;
  image: string;
  status: true;
  type: string;
  action: string;
  tier_ids: Array<number>;
  start_time: number | string;
  end_time: number | string;
}

export interface IupdateBanner {
  name?: string;
  description?: string;
  image?: string;
  status?: true;
  type?: string;
  action?: string;
  tier_ids?: Array<number>;
  start_time?: number | string;
  end_time?: number | string;
}

export interface IgetBannerResponse {
  page: number;
  limit: number;
  rules: IBanner[];
  maxPage: number;
  count: number;
}

export interface IgetBannerRoot {
  success: boolean;
  code: number;
  data: IgetBannerResponse;
  message: string;
}

export interface IgetOneRoot {
  success: boolean;
  code: number;
  data: IBanner;
  message: string;
}
