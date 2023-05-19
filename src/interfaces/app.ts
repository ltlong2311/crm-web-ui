export interface BaseResponseProps<TData = any> {
  code: number;
  data: TData;
  errors: any;
  messages: string;
  success: boolean;
  total: number;
}

export interface IGetRoot {
  success: boolean;
  code: number;
  message: string;
}

export interface IGetListParams {
  perPage?: number;
  page: number;
  search?: string;
}
export type DropdownProps = Array<{ value: string | number; label: string }>;
export interface FilterDataItem {
  value: string | number;
  label: string;
}

export interface IOption {
  value: any;
  label: string;
}
