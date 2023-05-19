import { IGetListParams } from './app';

export interface IGetCustomerParams extends IGetListParams {
  classification?: string | number;
  customerType?: any;
  tierId?: any;
  status?: any;
}

export interface ICustomer {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
  postal_code: string;
  status: string | null;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  dob: string;
  point: number;
  cashback: number;
  rate: number;
  taxCode: string;
  image: string;
  portal_code: string;
  stores?: any[];
  tier: {
    id: number;
    name: string;
  };
}

export interface ICreateCustomerBody {
  phone: string;
  firstName: string;
  lastName: string;
  dob: number;
  gender: string;
  address: string;
  classificationId: number;
}

export interface IUpdateCustomerBody {
  phone?: string;
  firstName?: string;
  lastName?: string;
  dob?: number;
  gender?: string;
  address?: string;
  point?: number;
  cashback?: number;
  rate?: number;
}

export interface ICustomerRes {
  id: number;
  cashback: number;
  member_id: number;
  merchant_id: number;
  tier_id: number;
  tier_name: string;
  total_spend?: string;
  total_rebate?: string;
  total_points?: string;
  total_used?: string;
  profile_match?: string;
  total_visits?: string;
  last_visit?: string;
  createdAt: string;
  updatedAt: string;
  member: {
    id: number;
    name: string;
    email: string;
    phone: string;
    gender: string;
    date_of_birth: string;
    address: string;
    postal_code: string;
    status: string | null;
    google_user_id: string | null;
  };
  tier: {
    id: number;
    name: string;
  };
}

export interface ICustomerDetailsRes {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string;
  address: string;
  postal_code: string;
  status: string | null;
  createdAt: string;
  updatedAt: string;
  memberLink: {
    id: number;
    cashback: number;
    member_id: number;
    merchant_id: number;
    tier_id: number;
    createdAt: string;
    updatedAt: string;
    tier_name: string;
    total_spend?: string;
    total_rebate?: string;
    total_points?: string;
    total_used?: string;
    profile_match?: string;
    total_visits?: string;
    last_visit?: string;
  };
}

export interface IGetCustomerResponse {
  page: number;
  limit: number;
  members: ICustomerRes[];
  count: number;
  maxPage: number;
}

export interface IGetOneMemberResponse {
  success: boolean;
  code: number;
  data: ICustomerDetailsRes;
  message: string;
}

export interface IGetCustomerRoot {
  success: boolean;
  code: number;
  data: IGetCustomerResponse;
  message: string;
}

export interface ICustomerInfo extends ICustomer {
  no?: number | string;
  birthday?: string;
  active?: boolean;
  onChangeStatus?: (value?: boolean) => void;
}
