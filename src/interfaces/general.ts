import { IGetRoot } from './app';
import { IOwnerInfo } from './auth';

export interface IGetMerchantInfo extends IGetRoot {
  data: IOwnerInfo;
}

export interface IUpdateGeneralInfoBody {
  email: string;
  people_amount: number;
  business_type: string;
  phone: string;
  work_phone: string;
}
